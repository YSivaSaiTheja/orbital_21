# Initial plan algorithm before optimization
def generate_plan(prog_dict, prereq_dict, maj_dict, taken_mods_list, progs_to_take_list, commonly_mapped_dict, last_sem, maj):
    # A boolean flag that determines if student has decided to go on an exchange program or not
    exchange_flag = False
    # First step is to determine how many semesters to plan for, check how many programs are inputted, and based on this, determine last program to take
    last_prog_to_take = progs_to_take_list[-1]
    num_of_sems_to_plan = 0
    if (last_prog_to_take[0] == "SIP" or last_prog_to_take[0] == "IIP"):
        num_of_sems_to_plan = last_prog_to_take[1] - last_sem - 1
    else: # Last program to be taken is an exchange program
        num_of_sems_to_plan = last_prog_to_take[1] - last_sem
        exchange_flag = True
    
    sem_counter = 0
    # Plan that is to be returned
    plan = {}
    # Getting the list of modules to take for the major
    mod_list = maj_dict[maj]
    # Removing all the mods that have already been taken
    for mod in taken_mods_list:
        mod_list.remove(mod)
    # Creating plan for each semester
    while (sem_counter < num_of_sems_to_plan):
        curr = last_sem + 1
        mods_this_sem = []
        # Creating a plan for standard workload (20 MCs)
        if (len(mods_this_sem) < 5):
            # Taking care of the prerequisite mods for the program
            for prog in progs_to_take_list:
                # Check if the program is an exchange program
                if (prog == "NOC" or prog == "SEP"):
                    mods_this_sem = commonly_mapped_dict[maj]
                    plan[curr] = mods_this_sem
                    break
                else:
                    # Assigning the mods to take for each program for SIP, IIP
                    mods_for_prog = prog_dict[prog]
                    for mod in mods_for_prog:
                        # Check if the mod can be taken this semester
                        if (can_take(mod, prereq_dict, taken_mods_list)):
                            mods_this_sem.append(mod)
                            taken_mods_list.append(mod)
                            mod_list.remove(mod)
                        else:
                            # If the mod cannot be taken, find the next mod that can be taken to fulfil prerequisite
                            next_mod_to_take = next_mod_needed(mod, prereq_dict, taken_mods_list)
                            mods_this_sem.append(next_mod_to_take)
                            taken_mods_list.append(mod)
                            mod_list.remove(mod)
                    # Once all the program mods have been taken, fill up remaining workload w other core modules
                    if (len(mods_this_sem) < 5):
                        no_of_mods_left = 5 - len(mods_this_sem)
                        counter = 0
                        while (counter < no_of_mods_left):
                            for mod in mod_list:
                                # Add other modules from the mod_list until standard workload is reached
                                if (can_take(mod, prereq_dict, taken_mods_list)):
                                    mods_this_sem.append(mod)
                    # Assign the module list for the current semester in plan
                    plan[curr] = mods_this_sem
        sem_counter += 1

    return plan 

# Helper function to test if a given module can be taken in the given semester
def can_take(mod, prereq_dict, taken_mods_list):
    mod_prereqs = prereq_dict[mod]
    prereq_set = set(mod_prereqs)
    taken_set = set(taken_mods_list)
    # Check if the prerequisite mods have been taken 
    return prereq_set.issubset(taken_set)

# Module queue to use for breadth first search
class ModQueue:
    queue = []

    def dequeue(self):
        self.queue.pop(0)

    def enqueue(self,mod):
        self.queue.append(mod)
    
    def empty(self):
        return self.queue == []

# Helper function to generate which mod to be taken if current module cannot be taken, using breadth first search
def next_mod_needed(mod, prereq_dict, taken_mods_list):
    q = ModQueue()
    q.push(mod)
    visited = {}
    for module in prereq_dict.keys():
        visited[module] = False
    
    for module in taken_mods_list:
        visited[module] = True

    # Perform breadth first search, while loop terminates when a mod that can be taken but is not taken yet is found
    while (not q.empty()):
        mod_to_take = q.dequeue()
        prereq_list = prereq_dict[mod_to_take]

        for mod in prereq_list:
            if (not visited[mod]):
                if can_take(mod, prereq_dict, taken_mods_list):
                    return mod
                else:
                    visited[mod] = True
                    q.enqueue(mod)
    return "dummy"