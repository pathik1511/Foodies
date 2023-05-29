import React, { Component } from 'react'
import axios from 'axios'

export class WordCloud extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: ""
        }
    }
    componentDidMount() {
        axios.get("https://2oyrg6shsk.execute-api.us-west-1.amazonaws.com/dev/dashboard").then(response => {
            if (response && response.data && response.data.Status == 200) {
                this.setState({url: response.data.EmbedUrl})
            }
        })
    }
    render() {
        return (
            <div>
                <a href={this.state.url}>Word Cloud</a>
                <iframe 
                width="800" 
                height="700" 
                src={this.state.url} 
                frameborder="0" allowfullscreen></iframe>
            </div>
        )
    }
}

export default WordCloud
