// import { GrClose } from "react-icons/gr";
import { forwardRef } from "react";
export default forwardRef(function TodoForm(props, ref) {
  return (
    <div className="modal">
      <div className="form-container">
        {/* <GrClose /> */}
        <input type="text" className="text-input" ref={ref} />
        <br />
        <button className="modal-close" onClick={props.closeModal}>
          Close
        </button>
        <button className="item-add" onClick={props.addEventHandler}>
          Add
        </button>
      </div>
      <div className="modal-backdrop" onClick={props.closeModal}></div>
    </div>
  );
});
