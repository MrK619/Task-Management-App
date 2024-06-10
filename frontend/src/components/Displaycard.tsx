"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { AddTask } from "./AddTask";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";
import { EditTask } from "./EditCard";

export function TaskList() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5050/record");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    //display no task message if there are no tasks
    if (tasks.length === 0) {
        return (
            <>
                <div className=" flex px-5 justify-end">
                    <AddTask onTaskAdded={fetchTasks} />
                </div>
                <div className="text-center mt-5 text-3xl">
                    No tasks available
                </div>
            </>
        );
    } else {
        return (
            <div>
                <div className=" flex px-5 justify-end">
                    <AddTask onTaskAdded={fetchTasks} />
                </div>
                <div className=" grid sm:grid-cols-3 grid-cols-1 gap-3 p-4">
                    {tasks.map((task: any) => (
                        <Card key={task._id}>
                            <CardHeader>
                                <CardTitle>{task.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{task.description}</p>
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-3">
                                <EditTask
                                    onTaskAdded={fetchTasks}
                                    data={task}
                                />
                                <Button
                                    className="p-3"
                                    onClick={async () => {
                                        try {
                                            const response = await axios.delete(
                                                `http://localhost:5050/record/${task._id}`
                                            );
                                            console.log(response.data);
                                            fetchTasks();
                                        } catch (error) {
                                            console.error(
                                                "Error deleting task:",
                                                error
                                            );
                                        }
                                    }}
                                >
                                    <Trash className="w-5 h-5" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}
