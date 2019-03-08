import React, { Component } from 'react';

export default class BookIndex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            author: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        let title = this.state.title
        let author = this.state.author

        fetch ("http://localhost:5000/books/input", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: title, author: author})
        })
        .then(response => {return response.json();})
        .then(responseData => {return responseData})
        .then(() => {this.props.history.push("/")})
        .catch(error => {
            console.log("Fetch error" + error)
        })
    }

    render() {
        return (
            <div className='books'>
                <h1>Add a book below</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Title</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                    <label>Author</label>
                    <input type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}
