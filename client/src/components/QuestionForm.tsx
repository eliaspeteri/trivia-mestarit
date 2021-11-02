import React, { useState } from 'react';
import { Container, Form, FormRadioProps, Segment } from 'semantic-ui-react';

const QuestionForm: React.FC = () => {
  const [answer_1, setAnswer_1] = useState<string>('');
  const [answer_2, setAnswer_2] = useState<string>('');
  const [answer_3, setAnswer_3] = useState<string>('');
  const [answer_4, setAnswer_4] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [question, setQuestions] = useState<string>('');

  const answersAreValid = (): boolean =>
    [answer_1, answer_2, answer_3, answer_4].every(
      (answer: string) => answer.length
    );

  return (
    <Container
      style={{
        backgroundColor: '#1b1c1d',
        border: '3px solid #f2711c',
        position: 'relative',
        top: '4em'
      }}
    >
      <Segment inverted style={{ paddingTop: '2em' }}>
        <Form inverted size={'massive'}>
          <Form.Field
            control={'textarea'}
            label={'Question'}
            rows={'2'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuestions(e.target.value)
            }
          />

          <Form.Group widths="equal">
            <Form.Field
              control={'input'}
              label={'Answer 1'}
              rows={'2'}
              value={answer_1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer_1(e.target.value)
              }
            />
            <Form.Field
              control={'input'}
              label={'Answer 2'}
              rows={'2'}
              value={answer_2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer_2(e.target.value)
              }
            />
          </Form.Group>

          <Form.Group widths={'equal'}>
            <Form.Field
              control={'input'}
              label={'Answer 4'}
              rows={'2'}
              value={answer_3}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer_3(e.target.value)
              }
            />
            <Form.Field
              control={'input'}
              label={'Answer 4'}
              rows={'2'}
              value={answer_4}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer_4(e.target.value)
              }
            />
          </Form.Group>

          <Form.Group inline as={'button-group'}>
            <label style={{ color: '#f2711c', padding: '0 1em 0 .25em' }}>
              Correct Answer
            </label>
            <Form.Field
              label={'1'}
              control={'input'}
              type={'radio'}
              onSelect={() => setCorrectAnswer(answer_1)}
            />
            <Form.Field
              label={'2'}
              control="input"
              type="radio"
              onSelect={() => setCorrectAnswer(answer_2)}
            />
            <Form.Field
              label={'3'}
              control={'input'}
              type="radio"
              onSelect={() => setCorrectAnswer(answer_3)}
            />
            <Form.Field
              label={'4'}
              control={'input'}
              type={'radio'}
              onSelect={() => setCorrectAnswer(answer_4)}
            />
          </Form.Group>

          <Form.Field
            control={'button'}
            disabled={!answersAreValid() || !question}
          >
            Submit
          </Form.Field>
        </Form>
      </Segment>
    </Container>
  );
};

export default QuestionForm;
