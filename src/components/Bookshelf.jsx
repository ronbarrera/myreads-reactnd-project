import React, { Component } from 'react'
import Book from './Book'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3 
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3 
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 
  }
};

class Bookshelf extends Component {
	render() {
		const { books, title } = this.props
		return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
          <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            ssr={true} 
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={this.props.deviceType} >
              {books.map((book) => (
                <div key={book.id} style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><Book book={book} onUpdateBook={this.props.onUpdateBook} />
                </div>
              ))}
          </Carousel>
      </div>
		)
	}
}

export default Bookshelf

