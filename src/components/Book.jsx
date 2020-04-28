import React from 'react'

const Book = props => {
	const imageUrl  = "url(\"" + props.book.imageLinks.smallThumbnail + "\")"

	const handleSelect = (e) => {
		if(props.onUpdateBook) {
			props.onUpdateBook(props.book, e.target.value)
		}
	}

	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: imageUrl }}></div>
				<div className="book-shelf-changer">
					<select
						value={props.book.shelf}
						onChange={handleSelect}>
						<option value="move" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{props.book.title}</div>
			<div className="book-authors">
				<span>&#183; </span>
				{(props.book.authors) && (props.book.authors.map((author) => (
					<span key={author}>{author} &#183; </span>
				)))}
			</div>
  	</div>
	)
}

export default Book