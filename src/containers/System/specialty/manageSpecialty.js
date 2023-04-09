import React from "react";
import "./manageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import toBase64 from "../../../utils/convertBase64";
import { userService } from "../../../services/index";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ManageSpecialty = () => {
  const [contentMarkdown, setContentMarkdown] = React.useState("");
  const [contentHTML, setContentHTML] = React.useState("");
  const [name, setName] = React.useState("");
  const [imageBase64, setImageBase64] = React.useState("");
  const [previewImg, setPreviewImg] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleEditorChange = ({ html, text }) => {
    setContentHTML(html);
    setContentMarkdown(text);
  };

  const handleChangeImage = async (e) => {
    const data = e.target.files;
    const file = data[0];
    const image = await toBase64(file);

    const objectURL = URL.createObjectURL(file);

    setImageBase64(image);
    setPreviewImg(objectURL);
  };

  const handleNewScpecialty = async () => {
    let response = await userService.addNewSpecialty({
      name,
      image: imageBase64,
      descriptionMarkDown: contentMarkdown,
      descriptionHTML: contentHTML,
    });

    if(response.errCode === 0) {
        toast.success(response.message);
    } else {
        toast.error(response.message);
    }
  };

  return (
    <div className="manage_specialty">
      <div className="title">Manage Specialty</div>
      <div className="container">
        <div className="row">
          <div className="form-group col-md-6">
            <label for="inputAddress">
              {/* <FormattedMessage id="manage-user.firstName" /> */}
              Ten chuyen khoa
            </label>
            <input
              value={name}
              type="text"
              className="form-control"
              id="inputAddress"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputZip">
              {/* <FormattedMessage id="manage-user.image" /> */}
              Anh chuyen khoa
            </label>
            <div className="preview_container">
              <input
                type="file"
                className="form-control"
                id="previewImg"
                hidden
                onChange={(e) => {
                  handleChangeImage(e);
                }}
              />
              <label htmlFor="previewImg" className="label_upload">
                Tai anh &nbsp;<i className="fas fa-upload"></i>
              </label>
              <div
                className="privew-image"
                style={{ backgroundImage: `url(${previewImg})` }}
                onClick={() => {
                  previewImg && setIsOpen(true);
                }}
              ></div>
            </div>
          </div>
          <div className="form-group col-md-12">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              value={contentMarkdown}
            />
          </div>
          <div className="form-group col-md-12">
            <button className="btn_save" onClick={handleNewScpecialty}>
              Lưu thông tin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSpecialty;
