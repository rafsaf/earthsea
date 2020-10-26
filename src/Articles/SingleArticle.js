
import React, {useState, useEffect} from 'react';
import {useParams,} from "react-router-dom";
import Part from '../shared/Part'
import Error from '../shared/Error'
import Data from '../fake'
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import { convertToHTML, convertFromHTML } from 'draft-convert'
import 'draft-js/dist/Draft.css';
import {
    faFacebook,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewArticle() {
    let { topicName } = useParams();
    const [article, setArticle] = useState()
    const [articleError, setArticleError] = useState(null)

    const fetchArticle = () => {
        setArticle(Data[0]);
    }

    useEffect(
        () => {
        fetchArticle()
    }, []
    )

    if (articleError !== 'notFound') {

        return (
            
            <div id='new article' style={{ paddingTop: '2%' }}>

                {article ?

                <Part height='80vh' lg={6} color='rgb(77, 76, 76)' background='white' left={
                    <RichEditorExample
                    title={article.title}
                    created={article.created}
                    lastModified={article.lastModified}
                    image={article.image}
                    verified={article.verified}
                    notVerified={article.notVerified}
                    like={article.like}
                    unlike={article.unlike}/>
                } /> 

                : 
                <div className='text-center'>

                <Error
                show={articleError}
                onExit={() => {
                    setArticleError(false);
                    fetchArticle();
                    }}>
                </Error>
                </div>

                }
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

const linkifyPlugin = createLinkifyPlugin();

class RichEditorExample extends React.Component {
    constructor(props) {
        super(props);

        this.blocks = convertFromHTML(props.verified);
        this.secondBlocks = convertFromHTML(props.notVerified)

        this.state = {
            editorState: EditorState.createWithContent(this.blocks),
            editMode: false,
        };
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
        if (this.state.editMode) {
        return (
            <div>

                <div className="RichEditor-root">
                <div className='text-left'>
                <button className='btn btn-sm btn-outline-primary mb-2'
                        onClick={() => 
                            {this.setState(
                               {
                               editMode: false,
                               editorState: EditorState.createWithContent(this.blocks)
                               }
                            )}}
                    >
                        Powrót
              </button>
                <button className='btn btn-sm btn-outline-primary mb-2 ml-1'
                        onClick={() => {

                            alert(` HTML to Save ${convertToHTML(this.state.editorState.getCurrentContent())}`);
                        }}
                    >
                        Zapisz zmiany
              </button>
                </div>

                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />

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
                            plugins={[linkifyPlugin]}
                            spellCheck={true}
                        />
                    </div>

                </div>
            </div>
        );}
        return (
            <div>
                <div className='text-left'>
                <button 
                className='btn btn-primary btn-sm mr-1'
                 onClick={() => 
                 {this.setState(
                    {
                    editMode: true,
                    editorState: EditorState.createWithContent(this.secondBlocks)
                    }
                 )}}>
                        Edytuj
                    </button>
                    <button className='btn btn-default mr-1'>
                    {this.props.like} <FontAwesomeIcon color='blue' icon={faThumbsUp}  />
                </button>
                <button className='btn btn-default mr-1'>
                {this.props.unlike} <FontAwesomeIcon color='black' icon={faThumbsDown}  />
                </button>
                    <a href="https://www.facebook.com/"
                    className="facebook social mr-1">
                    <FontAwesomeIcon icon={faFacebook}  />
                </a>
                <a href="https://www.twitter.com/" className="twitter social mr-1">
                    <FontAwesomeIcon icon={faTwitter}  />
                </a>

                </div>
                <div>
                    <h1>{this.props.title} </h1>


                </div>
                    <div className='my-5'>
                        <img src={this.props.image} alt='title-image' />
                    </div>

                <div className="RichEditor-editor mb-5">
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState = {this.state.editorState}
                        readOnly={true}
                        plugins={[linkifyPlugin]}
                        onChange ={ (editorState) => this.setState({editorState})}
                        />
                </div>
        </div>
        )
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





