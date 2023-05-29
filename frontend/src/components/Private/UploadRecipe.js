import React, { Component } from 'react'
import axios from "axios"
import Button from "react-bootstrap/Button"
export class UploadRecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipeSelected: {},
            similarityScore: []
        }
    }

    extractData = (event) => {
        event.preventDefault()
        const reader = new FileReader()
        let fileContent = ""

        reader.onload = async (response) => {
            fileContent = (response.target.result)
            this.checkSimilarity(fileContent)
            event.target.value = null;
        };
        reader.readAsText(event.target.files[0])

    }

    checkSimilarity(fileContent) {
        let jsonContent = JSON.parse(fileContent)
        this.setState({recipeSelected: jsonContent})
        let url = "https://vertexai-5omrz4kema-uc.a.run.app/api/classification/classify"
        axios.post(url, { text: jsonContent.Ingridents }).then(response => {
            if (response.status == 200) {
                let value = response.data && response.data[0] && response.data[0].structValue && response.data[0].structValue.fields;
                let name = value.displayNames && value.displayNames.listValue && value.displayNames.listValue.values
                let confidence = value.confidences && value.confidences.listValue && value.confidences.listValue.values
                this.displayResult(name, confidence)
            } else {
                console.log("Error")
            }
        })
    }

    displayResult(name, confidence) {
        let combine = []
        name.forEach((row, index) => {
            let obj = {}
            obj['name'] = row.stringValue;
            obj['value'] = confidence[index].numberValue;
            combine.push(obj)
        })
        
        combine.sort((a, b) => a.value < b.value ? 1 : -1)
        
        let topThree = combine.splice(0, 3);
        this.setState({similarityScore: topThree})
    }

    uploadToDynamoDB = (event) => {
        event.preventDefault()
        let row = {}
        row['cuisine'] = this.state.recipeSelected.Cuisine;
        row['ingredients'] = this.state.recipeSelected.Ingridents;
        row['restaurantId'] = localStorage.getItem("adminId");
        row['title'] = this.state.recipeSelected.Title;
        const url = "https://2oyrg6shsk.execute-api.us-west-1.amazonaws.com/dev/storeRecipe"
        
        axios.post(url, row).then(response => {
            
            alert("Recipe uploaded")
            this.setState({recipeSelected: {}})
            this.setState({similarityScore: []})
        })
    }

    render() {
        const similarityScore = this.state.similarityScore
        console.log(similarityScore)
        return (
            <div>
                <input type="file" onChange={(event) => this.extractData(event)} />
                {
                    this.state.similarityScore.length ? this.state.similarityScore.map(row => 
                        (<div>
                            <input type="range" min="0" max="10" value={row.value*10} disabled step="1"/>
                            <span>{row.name}({row.value})</span>
                        </div>)
                    ) : (
                        <div></div>
                    )
                }
                <Button variant="primary" onClick={this.uploadToDynamoDB}>Upload</Button>
            </div>
        )
    } 
}

export default UploadRecipe
