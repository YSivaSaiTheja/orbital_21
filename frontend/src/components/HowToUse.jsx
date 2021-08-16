import { Carousel } from 'react-bootstrap';
import { useState } from 'react';
import Image1 from "../assets/image holder 1.jpg"
import Image2 from "../assets/image holder 2.jpg"
import Image3	 from "../assets/image holder 3.jpg"
import Image4 from "../assets/image holder 4.jpg"

const HowToUse = () => {

	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	return (
		<div className='mt-3'>
			<Carousel variant="dark" activeIndex={index} onSelect={handleSelect} interval={null}>
			  <Carousel.Item>
			    <img
			      className="h-150 w-100"
			      src={Image1}
			      alt="First slide"
			    />
			    <Carousel.Caption>
			  	  <h3>First slide label</h3>
			      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
			    </Carousel.Caption>
			  </Carousel.Item>

			  <Carousel.Item>
			    <img
			      className="h-150 w-100"
			      src={Image2}
			      alt="Second slide"
			    />
			    <Carousel.Caption>
			      <h3>Second slide label</h3>
			      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			  <Carousel.Item>
			    <img
			      className="h-150 w-100"
			      src={Image3}
			      alt="Third slide"
			    />
			    <Carousel.Caption>
			      <h3>Third slide label</h3>
			      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			  <Carousel.Item>
			    <img
			      className="h-150 w-100"
			      src={Image4}
			      alt="Fourth slide"
			    />
			    <Carousel.Caption>
			      <h3>Fourth slide label</h3>
			      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			</Carousel>
		</div>
	)

}

export default HowToUse;
