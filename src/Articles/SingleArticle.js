import React from 'react';
import { useState, useEffect } from 'react'
import {
    Switch,
    Route,
    Redirect,
    useRouteMatch,
    useParams,
} from "react-router-dom";
import Part from '../shared/Part'
import { Editor, EditorState, RichUtils, CompositeDecorator, convertToRaw } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert'
import 'draft-js/dist/Draft.css';

function MyEditor(props) {
    const editorState = EditorState.createWithContent(convertFromHTML('<ul><li>kkk</li></ul><ol type="1"><li>jjj</li></ol><h4>jjjj</h4><h4><u>jjjjkkkkkkkkkkkkkkkk</u></h4><blockquote>kjkkkkkkkkkkkkkkkkkkkkk</blockquote><blockquote>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsasddasdsa</blockquote>'));



    return (
        <div>
            <div className='RichEditor-editor'>
                {props.title}
            </div>

            <div className='RichEditor-editor'>
                <Editor readOnly blockStyleFn={getBlockStyle} customStyleMap={styleMap} editorState={editorState} />
            </div>
        </div>

    )
}

class RichEditorExample extends React.Component {
    constructor(props) {
        super(props);
        const decorator = new CompositeDecorator([
            {
              strategy: findLinkEntities,
              component: Link,
            },
          ]);
        this.state = {
            editorState: EditorState.createEmpty(decorator),
            showURLInput: false,
            urlValue: '',
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState });

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

        this.promptForLink = this._promptForLink.bind(this);
        this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
        this.confirmLink = this._confirmLink.bind(this);
        this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
        this.removeLink = this._removeLink.bind(this);
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }
    _promptForLink(e) {
        e.preventDefault();
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

            let url = '';
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey);
                url = linkInstance.getData().url;
            }

            this.setState({
                showURLInput: true,
                urlValue: url,
            }, () => {
                setTimeout(() => this.refs.url.focus(), 0);
            });
        }
    }

    _confirmLink(e) {
        e.preventDefault();
        const { editorState, urlValue } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            { url: urlValue }
        );
        
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
            showURLInput: false,
            urlValue: '',
        }, () => {
            
            setTimeout(() => this.refs.editor.focus(), 0);
        });
    }

    _onLinkInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmLink(e);
        }
    }

    _removeLink(e) {
        e.preventDefault();
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                editorState: RichUtils.toggleLink(editorState, selection, null),
            });
        }
    }

    render() {
        let urlInput;
        if (this.state.showURLInput) {
            urlInput =
                <div style={styles.urlInputContainer}>
                    <input
                        onChange={this.onURLChange}
                        ref="url"
                        style={styles.urlInput}
                        type="text"
                        value={this.state.urlValue}
                        onKeyDown={this.onLinkInputKeyDown}
                    />
                    <button onClick={this.confirmLink}>
                        Confirm
              </button>
                </div>;
        }
        const { editorState } = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div>
                <div>

                    <button
                        onClick={() => {

                            alert(` HTML to Save ${convertToHTML(this.state.editorState.getCurrentContent())}`);
                        }}
                    >
                        Save
              </button>
                </div>
                <div className="RichEditor-root">

                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                    <div style={styles.buttons}>
                        <button
                            onMouseDown={this.promptForLink}
                            style={{ marginRight: 10 }}>
                            Add Link
                        </button>
                        <button onMouseDown={this.removeLink}>
                            Remove Link
                    </button>
                    </div>
                    {urlInput}
                    <div className={className} onClick={this.focus}>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            onTab={this.onTab}
                            placeholder="Napisz coś..."
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>

                </div>
            </div>
        );
    }
}

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  }

const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} style={styles.link}>
        {props.children}
      </a>
    );
  };
  
  const styles = {
    buttons: {
      marginBottom: 10,
    },
    urlInputContainer: {
      marginBottom: 10,
    },
    urlInput: {
      fontFamily: '\'Georgia\', serif',
      marginRight: 10,
      padding: 3,
    },
    button: {
      marginTop: 10,
      textAlign: 'center',
    },
    link: {
      color: '#3b5998',
      textDecoration: 'underline',
    },
  };

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
];

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};





export default function NewArticle() {
    let { topicName } = useParams();

    if (topicName === 'Ged') {
        return (
            <div id='new article' style={{ paddingTop: '2%' }}>

                <Part lg={6} color='rgb(77, 76, 76)' background='white' left={
                    <MyEditor title={topicName} />
                } />



                <RichEditorExample />
            </div>
        )
    }
    return (
        <Part left={
            <div style={{ paddingTop: '5%' }}>
                <h3>{topicName}</h3>
                <h3>Nie znaleziono artukułu o takiej nazwie!</h3>
                <p>Upewnij się że podany adres url jest poprawny oraz czy materiał nie został usunięty.</p>
            </div>
        } height='80vh' />
    )
}
