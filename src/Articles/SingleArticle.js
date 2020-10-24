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
import addLinkPlugin from './addLinkPlugin'
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

        this.state = {
            editorState: EditorState.createEmpty(),
        };
        this.plugins = [
            addLinkPlugin,
          ];
        this.focus = () => this.refs.editor.focus();

        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

    }
    onChange = editorState => {
        this.setState({
          editorState
        });
      };
    onAddLink = () => {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt("Paste the link -");
        if (!link) {
        this.onChange(RichUtils.toggleLink(editorState, selection, null));
        return "handled";
        }

        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
        url: link
        });
        const newEditorState = EditorState.push(
        editorState,
        contentWithEntity,
        "create-entity"
        );
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
        return "handled";
    };

    handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(
        this.state.editorState,
        command
        );
        if (newState) {
        this.onChange(newState);
        return "handled";
        }
        return "not-handled";
    };

    

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


    render() {
        
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
                    <div>
                        <button id='link_url' className='add-link' onClick={this.onAddLink}>link</button>
                    </div>
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
                            plugins={this.plugins}
                            spellCheck={true}
                        />
                    </div>

                </div>
            </div>
        );
    }
}


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
