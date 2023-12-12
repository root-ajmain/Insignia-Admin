/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Input, Modal } from "rsuite";
import { useCreateFaqMutation } from "../../../redux/features/faq/faqApi";
import useToaster from "../../../hooks/useToaster";
import { useAppDispatch } from "../../../redux/hook";
import { setFaq } from "../../../redux/features/faq/faqSlice";

const ModalCreate = ({ handleClose, open }) => {
  const [createFaq, { data, error }] = useCreateFaqMutation();
  const dispatch = useAppDispatch();
  const handleToaster = useToaster();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data?.statusCode === 200) {
      handleClose();
      reset();
      handleToaster(data.message, "success", "Success");
      // dispatch(setFaq(data));
    } else if (error?.status) {
      handleToaster(error.data?.errorMessages[0]?.message, "error", "Error");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const onSubmit = (data) => {
    const options = {
      data: data,
    };
    createFaq(options);
  };

  return (
    <Modal overflow={true} open={open} onClose={handleClose}>
      <Form fluid onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>Add FAQ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form.ControlLabel className="font-brand__font__semibold">
              Question
            </Form.ControlLabel>
            <Input
              name="title"
              placeholder="FAQ Question"
              className="text-brand__font__size__base"
              {...register("title", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
            />
            <Form.HelpText>
              <span className="text-danger">
                {errors?.title?.type === "required" && errors?.title?.message}
              </span>
            </Form.HelpText>
          </div>
          <div>
            <Form.ControlLabel className="font-brand__font__semibold">
              Answer
            </Form.ControlLabel>
            <Input
              name="answer"
              as="textarea"
              rows={4}
              placeholder="FAQ Answer"
              className="text-brand__font__size__base"
              {...register("answer", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
            />
            <Form.HelpText>
              <span className="text-danger">
                {errors?.answer?.type === "required" && errors?.answer?.message}
              </span>
            </Form.HelpText>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="bg-success px-8 py-1 text-white rounded"
          >
            Add
          </Button>
          <Button
            onClick={handleClose}
            className="bg-danger px-8 py-1 text-white rounded"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalCreate;
