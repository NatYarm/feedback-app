import { getValue } from '@testing-library/user-event/dist/utils';
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FeedbackContext from '../context/FeedbackContext';
import RatingSelect from './RatingSelect';
import Button from './shared/Button';
import Card from './shared/Card';

const FeedbackForm = () => {
  //const [text, setText] = useState('');
  // const [btnDisabled, setBtnDisabled] = useState(true);
  // const [message, setMessage] = useState('');
  const [rating, setRating] = useState(10);
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  // const form = useForm();
  // console.log(form);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  // const onSubmit = (data) => {
  //   console.log(data);
  //   reset();
  // };
  //console.log(formState);

  //const handleTextChange = (e) => {
  // if (text.trim().length <= 10) {
  //   setBtnDisabled(true);
  //   setMessage('Text must be at least 10 characters');
  // } else {
  //   setMessage(null);
  //   setBtnDisabled(false);
  // }

  //setText(e.target.value);
  //};

  const onFormSubmit = ({ review }) => {
    const newFeedback = {
      text: review,
      rating,
    };

    feedbackEdit.edit === true
      ? updateFeedback(feedbackEdit.item.id, newFeedback)
      : addFeedback(newFeedback);
    reset();
  };

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setRating(feedbackEdit.item.rating);
      setValue('review', feedbackEdit.item.text);
    }
  }, [feedbackEdit]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h2>How would you rate our service?</h2>
        <RatingSelect onSelect={setRating} selected={rating} />
        <div className="input-group">
          <input
            // onChange={handleTextChange}
            {...register('review', {
              required: 'This field is required',
              minLength: {
                value: 10,
                message: 'Text must be at least 10 characters',
              },
            })}
            name="review"
            type="text"
            placeholder="Write a review"
            //value={text}
          />
          <Button type="submit">Send</Button>
        </div>

        <div className="message">{errors?.review && errors.review.message}</div>
      </form>
    </Card>
  );
};

export default FeedbackForm;
//
