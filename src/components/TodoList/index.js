import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux'
// import { addTodo } from '../../redux/actions';
import todoSlice from '../../redux/todoReducer';
import { useState } from 'react';
import { v4 } from 'uuid';
import { getTodo } from '../../redux/selectors'
import { addNewTodo } from '../../redux/todoReducer';

export default function TodoList() {
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [priority, setPriority] = useState('Medium')
  

  const todoList = useSelector(getTodo)

  const handleAddTodo = () => {
    // dispatch(todoSlice.actions.addTodo({
    //   id: v4(),
    //   name: name,
    //   priority: priority,
    //   completed: false,
    // }))
    dispatch(addNewTodo({
      name: name,
      priority: priority,
      completed: false,
    }));
    setName('')
    setPriority('Medium')
  }

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {
          todoList.map((value) => {
            return (<Todo key={value.id} name={value.name} priority={value.priority} completed={value.completed} id={value.id}/>)
          })
        }
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input value={name} onChange={(e) => {
              setName(e.target.value)
          }}/>
          <Select defaultValue="Medium" value={priority} onChange={(value) => setPriority(value)}>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddTodo}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
