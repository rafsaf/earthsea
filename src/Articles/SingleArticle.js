import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Part from "../shared/Part";
import Error from "../shared/Error";
import * as api from "../shared/api";
import Select from "./select";
import { EditorState, RichUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import { convertToHTML, convertFromHTML } from "draft-convert";
import "draft-js/dist/Draft.css";
import {
  faThumbsUp,
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "../img/cool.png";
import Alert from "react-bootstrap/Alert";

export default function SingleArticle() {
  let { topicName } = useParams();
  const [article, setArticle] = useState();
  const [version, setVersion] = useState();
  const [allVersions, setAllVersions] = useState();
  const [articleError, setArticleError] = useState(null);

  const fetchArticle = () => {
    api
      .receiveArticle(topicName)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        if (!error.response) {
          setArticleError(true);
        } else {
          setArticleError("notFound");
        }
      });
  };

  const fetchVersions = () => {
    api
      .receiveArticleVersion(topicName)
      .then((response) => {
        setAllVersions(response.data);
        setVersion(response.data[0]);
        setArticleError(false);
      })
      .catch((error) => {
        if (!error.response.status) {
          alert("asd");

          setArticleError(true);
        } else {
          setArticleError("notFound");
        }
      });
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  useEffect(() => {
    fetchVersions();
  }, []);

  const handleClick = (id) => {
    const current = allVersions.filter((row) => row.id === parseInt(id));

    setVersion(current[0]);
  };

  if (articleError !== "notFound") {
    return (
      <div
        id="new article"
        style={{
          paddingTop: "",
          backgroundImage: `url(${Image})`,
          fontFamily: "Oswald, sans-serif",
          width: "100%",
          paddingRight: 15,
          paddingLeft: 15,
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <div>
          {!articleError && article && version ? (
            <RichEditorExample
              fetchVersions={fetchVersions}
              topicName={topicName}
              onChange={handleClick}
              allVersions={allVersions}
              title={article.title}
              created={article.created}
              lastModified={version.created}
              image={article.image}
              text={version.text}
              like={article.like}
              confirm={version.confirm}
              imageConfirm={article.image_confirm}
              author={article.author}
              source={article.source}
            />
          ) : (
            <div className="text-center pt-4" style={{ height: "80vh" }}>
              <Error
                show={articleError}
                onExit={() => {
                  setArticleError(null);
                  fetchArticle();
                  fetchVersions();
                }}
              ></Error>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <Part
      left={
        <div>
          <h3>{topicName}</h3>
          <h3>Nie znaleziono artukułu o takiej nazwie!</h3>
          <p>
            Upewnij się że podany adres url jest poprawny oraz czy materiał nie
            został usunięty.
          </p>
        </div>
      }
      height="80vh"
    />
  );
}

const linkifyPlugin = createLinkifyPlugin();

class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.blocks = convertFromHTML(props.text);

    this.state = {
      editorState: EditorState.createWithContent(this.blocks),
      editMode: false,
      saved: false,
      like: props.like,
      success: false,
    };
    this.focus = () => this.refs.editor.focus();

    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }
  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.text !== prevProps.text) {
      this.blocks = convertFromHTML(this.props.text);
      this.setState({
        editorState: EditorState.createWithContent(this.blocks),
      });
    }
  }
  v;

  handleKeyCommand = (command) => {
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
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }
    if (this.state.editMode) {
      return (
        <div className="col-12 col-lg-7 mx-auto py-5">
          <div className="RichEditor-root">
            <div className="text-right">
              <button
                className="btn btn-sm btn-outline-primary mb-5"
                onClick={() => {
                  const text = convertToHTML(
                    this.state.editorState.getCurrentContent()
                  );
                  api.versionCreate(this.props.topicName, text).then(() => {
                    this.setState({
                      editMode: false,
                      editorState: EditorState.createWithContent(this.blocks),
                      success: true,
                    });
                    this.props.fetchVersions();
                  });
                }}
              >
                Zaproponuj zmiany i wyślij
              </button>
            </div>
            <div className="text-left">
              <button
                className="btn btn-sm btn-outline-primary mb-2"
                onClick={() => {
                  this.setState({
                    editMode: false,
                    editorState: EditorState.createWithContent(this.blocks),
                  });
                }}
              >
                Powrót
              </button>
              <button
                className="btn btn-sm btn-outline-success mb-2 ml-2"
                onClick={() => {
                  const actualText = convertToHTML(
                    this.state.editorState.getCurrentContent()
                  );
                  localStorage.setItem(this.props.title, actualText);
                  this.setState({ saved: true });
                  setTimeout(() => {
                    this.setState({ saved: false });
                  }, 2000);
                }}
              >
                {this.state.saved ? (
                  <span>Zapisano...</span>
                ) : (
                  <span>Zapisz zawartość lokalnie</span>
                )}
              </button>
              <button
                className="btn btn-sm btn-outline-success mb-2 ml-2"
                onClick={() => {
                  const savedText = convertFromHTML(
                    localStorage.getItem(this.props.title)
                  );
                  this.setState({
                    editorState: EditorState.createWithContent(savedText),
                  });
                }}
              >
                Wczytaj zawartość
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
      );
    }
    return (
      <div style={{ minHeight: "80vh" }}>
        <div className="col-12 mx-auto">
          <div
            className="text-left py-2"
            style={{ marginRight: -15, marginLeft: -15 }}
          >
            <Alert
            className="mt-3"
              show={this.state.success}
              variant="success"
              dismissible
              onClose={() => this.setState({ success: false })}
            >
              <p>Pomyślnie dodano nową wersję, znajdziesz ją jako pierwszą z niezweryfikowanych.</p>
              <p>Zostanie ona z czasem przeglądnięta i dodana bądź usunięta.</p>
            </Alert>
            <div className="pb-1">
              <button
                className="btn btn-primary btn-sm mr-2"
                onClick={() => {
                  this.setState({
                    editMode: true,
                  });
                }}
              >
                Edytuj
              </button>
              {this.props.confirm ? (
                <FontAwesomeIcon
                  className="mr-1"
                  color="green"
                  icon={faCheckCircle}
                />
              ) : (
                <FontAwesomeIcon
                  className="mr-1"
                  color="red"
                  icon={faTimesCircle}
                />
              )}
              {this.props.imageConfirm ? (
                <FontAwesomeIcon
                  className="mr-1"
                  color="green"
                  icon={faCheckCircle}
                />
              ) : (
                <FontAwesomeIcon
                  className="mr-1"
                  color="red"
                  icon={faTimesCircle}
                />
              )}
              {this.props.confirm ? (
                <span></span>
              ) : (
                <span style={{ color: "red" }} className="small">
                  Artykuł niezweryfikowany
                </span>
              )}
              <button
                onClick={() => {
                  const clicked = localStorage.getItem(
                    `${this.props.topicName}-like`
                  );
                  if (!clicked) {
                    api.likeArticle(this.props.topicName).then(() => {
                      localStorage.setItem(
                        `${this.props.topicName}-like`,
                        "true"
                      );
                      this.setState({ like: this.state.like + 1 });
                    });
                  }
                }}
                className="btn btn-default btn-sm"
              >
                {this.state.like}{" "}
                <FontAwesomeIcon color="blue" icon={faThumbsUp} />
              </button>
            </div>
            <Select
              onChange={this.props.onChange}
              allVersions={this.props.allVersions}
            />
          </div>
        </div>

        <div className="text-center">
          <h1 style={{ fontSize: 60 }} className="my-4">
            {this.props.title}
          </h1>
        </div>
        <div className="my-1" style={{}}></div>
        <div className="row justify-content-center">
          <div className="col-11 col-md-8 offset-md-1 col-lg-7 offset-lg-2">
            <div
              className="RichEditor-editor mb-5"
              style={{ marginRight: -15, marginLeft: -15 }}
            >
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={this.state.editorState}
                readOnly={true}
                plugins={[linkifyPlugin]}
                onChange={(editorState) => this.setState({ editorState })}
              />
            </div>
          </div>

          <div className="col-3">
            <div className="d-none d-lg-block">
              {this.props.imageConfirm ? (
                <figure className="figure">
                  <img
                    className="img-fluid"
                    src={api.API_IMG + this.props.image}
                    alt="title"
                  />
                  <figcaption className="figure-caption">
                    Źródło: {this.props.source ? this.props.source : "Nieznane"}
                  </figcaption>
                </figure>
              ) : (
                <div>
                  <figcaption className="figure-caption">
                    Zdjęcie niezwerfikowane.
                  </figcaption>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
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
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
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
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
