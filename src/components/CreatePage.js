import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { DRAFTS_QUERY } from './DraftsPage'

class CreatePage extends Component {
  state = {
    title: '',
    text: '',
    file: '',
    fileName: ''
  }

  getBase64FromBlob = (e) => {
    const reader = new FileReader()
    const files = e.target.files; // FileList object
    const fileName = files[0].name;
    reader.readAsDataURL(files[0])
    reader.onload = () => {
        if (!!reader.result) {
            this.setState({file: reader.result, fileName: fileName})
        }
    }
  }  

  render() {
    return (
      <Mutation
        mutation={CREATE_DRAFT_MUTATION}
        update={(cache, { data }) => {
          console.log('data=====', data)
          const { drafts } = cache.readQuery({ query: DRAFTS_QUERY })
          cache.writeQuery({
            query: DRAFTS_QUERY,
            data: { drafts: drafts.concat([data.createDraft]) },
          })
        }}
      >
        {(createDraft, { data, loading, error }) => {
          return (
            <div className="pa4 flex justify-center bg-white">
              <form
                onSubmit={async e => {
                  e.preventDefault()
                  const { title, text, file, fileName } = this.state
                  await createDraft({
                    variables: { title, text, file, fileName },
                  })
                  this.props.history.replace('/draft')
                }}
              >
                <h1>Create Post</h1>
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ title: e.target.value })}
                  placeholder="Title"
                  type="text"
                  value={this.state.title}
                />
                 <input
                  autoFocus
                  name="files[]"
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={files => this.getBase64FromBlob(files)}
                  placeholder="Title"
                  type="file"
                  
                />
                <textarea
                  className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
                  cols={50}
                  onChange={e => this.setState({ text: e.target.value })}
                  placeholder="Content"
                  rows={8}
                  value={this.state.text}
                />
                
                <input
                  className={`pa3 bg-black-10 bn ${this.state.text &&
                    this.state.title &&
                    'dim pointer'}`}
                  disabled={!this.state.text || !this.state.title}
                  type="submit"
                  value="Create"
                />&nbsp;
                <a className="pa3 bg-black-10" onClick={this.props.history.goBack}>
                   Cancel
                </a>
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }

}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($title: String!, $text: String!, $file: String, $fileName: String) {
    createDraft(title: $title, text: $text, file: $file, fileName: $fileName) {
      id
      title
      text
      file
      fileName
    }
  }
`

export default withRouter(CreatePage)
