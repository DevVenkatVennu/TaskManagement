import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal, Container, Row, Col, Dropdown } from 'react-bootstrap';
import HomeComponent from './Home';
import '../App.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    storyPoints: '',
  });

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Update local storage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    setNewTask({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      storyPoints: '',
    });
  };

  const handleShowModal = (task) => {
    setSelectedTask(task);
    setNewTask({ ...task });
    setShowModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowDeleteModal = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSaveTask = () => {
    if (selectedTask) {
      const updatedTasks = tasks.map((task) =>
        task === selectedTask ? { ...newTask } : task
      );
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, newTask]);
    }
    setShowModal(false);
  };

  const handleDeleteTask = () => {
    setTasks(tasks.filter((task) => task !== selectedTask));
    setShowDeleteModal(false);
  };

  return (
    <div>
      <HomeComponent />
      <h1>Task Management</h1>
      <Button onClick={() => handleShowModal(null)}>Create Task</Button>

      <Container>
        <Row>
          {tasks.map((task, index) => (
            <Col key={index}>
              <Card style={{ width: '18rem', margin: '1rem' }}>
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                  <Card.Text>Start Date: {task.startDate}</Card.Text>
                  <Card.Text>End Date: {task.endDate}</Card.Text>
                  <Card.Text>Story Points: {task.storyPoints}</Card.Text>
                  <Button variant="primary" onClick={() => handleShowModal(task)}>
                    View
                  </Button>
                  <Button variant="danger" onClick={() => handleShowDeleteModal(task)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTask ? 'Edit Task' : 'Create Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="status-dropdown">
                  {newTask.status || 'Select Status'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setNewTask((prevState) => ({ ...prevState, status: 'New' }))}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setNewTask((prevState) => ({ ...prevState, status: 'Active' }))}>
                    Active
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setNewTask((prevState) => ({ ...prevState, status: 'In Progress' }))}>
                    In Progress
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setNewTask((prevState) => ({ ...prevState, status: 'Done' }))}>
                    Done
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setNewTask((prevState) => ({ ...prevState, status: 'Closed' }))}>
                    Closed
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>


            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={newTask.startDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={newTask.endDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="storyPoints">
              <Form.Label>Story Points</Form.Label>
              <Form.Control
                type="number"
                name="storyPoints"
                value={newTask.storyPoints}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {selectedTask ? (
            <>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveTask}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveTask}>
                Save
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteTask}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tasks;
