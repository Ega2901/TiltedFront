import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import logo from '../assets/tilted.svg';

const TasksContainer = styled.div`
    padding: 20px;
    min-height: 100vh;
    width: 80%;
    margin: 0 auto;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0;

    h2 {
        margin: 0;
        padding: 0;
        line-height: 1.2;
    }

    p {
        margin: 5px 0 0;
        line-height: 1.2;
    }
`;

const Logo = styled.img`
    width: 150px;
    height: auto;
    margin-bottom: 20px;
`;

const TaskList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
`;

const TaskItem = styled.li`
    background-color: #292929;
    margin: 5px 0;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const TaskInfo = styled.div`
    display: flex;
    align-items: center;
`;

const TaskDetails = styled.div`
    margin-left: 10px;
`;

const TaskTitle = styled.div`
    font-weight: bold;
    font-size: 14px;
`;

const TaskDescription = styled.div`
    color: #b0b0b0;
    font-size: 12px;
`;

const TaskImage = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 5px;
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 3px solid #ffffff;
    width: 20px;
    height: 20px;
    animation: ${rotate} 1s linear infinite;
`;

const TaskButton = styled.button`
    background-color: ${props => (props.completed ? '#ffffff' : '#6f4ff8')};
    color: ${props => (props.completed ? '#000000' : '#fff')};
    padding: 8px 16px;
    font-size: 12px;
    border: none;
    border-radius: 10px;
    cursor: ${props => (props.completed || props.loading ? 'not-allowed' : 'pointer')};
    position: relative;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${props => (props.completed ? '#ffffff' : '#3b279f')};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const API_BASE_URL = 'https://tiltedxyz.ru/api';

const Tasks = ({ user }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/tasks/user_tasks`, {
                    params: { user_id: user.id }
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, [user]);

    const handleTaskComplete = async (taskId, link) => {
        try {
            await axios.post(`${API_BASE_URL}/tasks/${taskId}/complete/`, { user_id: user.id });
            window.location.href = link; // Переход по ссылке
        } catch (error) {
            console.error('Failed to claim task:', error);
        }
    };

    return (
        <TasksContainer>
            <HeaderContainer>
                <Logo src={logo} alt="Logo" />
                <h2>You’ve {tasks.length} Quest Available</h2>
                <p>Complete tasks to earn more Tilted Points.</p>
            </HeaderContainer>
            <TaskList>
                {tasks.map(task => (
                    <TaskItem key={task.id}>
                        <TaskInfo>
                            <TaskImage src={task.task_image} alt={task.task_name} />
                            <TaskDetails>
                                <TaskTitle>{task.task_name}</TaskTitle>
                                <TaskDescription>{task.task_description}</TaskDescription>
                            </TaskDetails>
                        </TaskInfo>
                        <div>
                            <p>{`Points: ${task.task_points}`}</p> {/* Отображение начисляемых очков */}
                            <TaskButton
                                completed={task.completed}
                                loading={task.loading}
                                onClick={() => handleTaskComplete(task.id, task.link)}
                                disabled={task.completed || task.loading}
                            >
                                {task.loading ? <Loader /> : task.buttonText || 'Start'}
                            </TaskButton>
                        </div>
                    </TaskItem>
                ))}
            </TaskList>
        </TasksContainer>
    );
};

export default Tasks;
