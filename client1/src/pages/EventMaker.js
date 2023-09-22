import React, { useEffect, useState } from "react";
import Inputs from "../components/Inputs";
import Date from "../components/date"
import { useDispatch, useSelector } from 'react-redux'
import { AddEventList } from "../redux/actions/eventListActions";
import "jodit";
import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";
const copyStringToClipboard = function (str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const facilityMergeFields = [
  "FacilityNumber",
  "FacilityName",
  "Address",
  "MapCategory",
  "Latitude",
  "Longitude",
  "ReceivingPlant",
  "TrunkLine",
  "SiteElevation"
];
const inspectionMergeFields = [
  "InspectionCompleteDate",
  "InspectionEventType"
];
const createOptionGroupElement = (mergeFields, optionGrouplabel) => {
  let optionGroupElement = document.createElement("optgroup");
  optionGroupElement.setAttribute("label", optionGrouplabel);
  for (let index = 0; index < mergeFields.length; index++) {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("class", "merge-field-select-option");
    optionElement.setAttribute("value", mergeFields[index]);
    optionElement.text = mergeFields[index];
    optionGroupElement.appendChild(optionElement);
  }
  return optionGroupElement;
}
const buttons = [
  "undo",
  "redo",
  "|",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "superscript",
  "subscript",
  "|",
  "align",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "link",
  "table",
  "|",
  "hr",
  "eraser",
  "copyformat",
  "|",
  "fullsize",
  "selectall",
  "print",
  "|",
  "source",
  "|",
  {
    name: "insertMergeField",
    tooltip: "Insert Merge Field",
    popup: (editor, current, self, close) => {
      function onSelected(e) {
        let mergeField = e.target.value;
        if (mergeField) {
          console.log(mergeField);
          editor.selection.insertNode(
            editor.create.inside.fromHTML("{{" + mergeField + "}}")
          );
        }
      }
      let divElement = editor.create.div("merge-field-popup");

      let labelElement = document.createElement("label");
      labelElement.setAttribute("class", "merge-field-label");
      labelElement.text = 'Merge field: ';
      divElement.appendChild(labelElement);

      let selectElement = document.createElement("select");
      selectElement.setAttribute("class", "merge-field-select");
      selectElement.appendChild(createOptionGroupElement(facilityMergeFields, "Facility"));
      selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, "Inspection"));
      selectElement.onchange = onSelected;
      divElement.appendChild(selectElement);

      console.log(divElement);
      return divElement;
    }
  },
  {
    name: "copyContent",
    tooltip: "Copy HTML to Clipboard",
    exec: function (editor) {
      let html = editor.value;
      copyStringToClipboard(html);
    }
  }
];

const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: "auto",
  toolbarButtonSize: "medium",
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  //defaultActionOnPaste: "insert_clear_html",
  buttons: buttons,
  uploader: {
    insertImageAsBase64URI: true
  },
  width: 1000,
  height: 442
};

const initialContent = `<p>TRY COPY CONTENT FROM A WORD AND PASTE HERE.</p>`


export default function EventListPage() {
  const [form, setForm] = useState({})
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const events = useSelector(state => state.events)
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })  
  }
  const onChangeHandler1= (e) => {
    setForm({
      ...form,
      description: e
    })  
  }
  const onChangeHandlerDate = (e) => {
  setForm({
    ...form,
    date: e
  })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(AddEventList(form, setShow, setMessage))
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Inputs name="title" label="titre de l'événement" value={form && form.title ? form.title : ""} onChangeHandler={onChangeHandler} errors={errors.title} />
        <Date name="date" label="date de l'événement" value={form.date} onChangeHandler={onChangeHandlerDate} errors={errors.date} />
        <div className="App" style={{ maxWidth: editorConfig.width, margin: "0 auto" }}>
          <JoditEditor
            name="description"
            value={form.description||initialContent}
            config={editorConfig}
            onChange={onChangeHandler1}
          />

          <div>
          Contenu de l'événement :
            <span dangerouslySetInnerHTML={{ __html: form.description||initialContent }} />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-outline-primary">
              Update <i className="fa-solid fa-floppy-disk"></i>
            </button>
          </div>
        </div>
        </form>
    </div>
  );
}