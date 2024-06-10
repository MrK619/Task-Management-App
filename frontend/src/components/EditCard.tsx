"use client";
import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { FilePenLine } from "lucide-react";

export function EditTask({ onTaskAdded, data }: any) {
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // try {
        //     const response = await axios.post("http://localhost:5050/record", {
        //         title: title,
        //         description: description,
        //     });
        //     console.log(response.data);
        //     onTaskAdded(); // Call the callback function
        // } catch (error) {
        //     console.error("Error adding task:", error);
        // }
        //make a patch request to update the task
        try {
            const response = await axios.patch(
                `http://localhost:5050/record/${data._id}`,
                {
                    title: title,
                    description: description,
                }
            );
            console.log(response.data);
            onTaskAdded(); // Call the callback function
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <FilePenLine className="w-5 h-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>
                        Enter the task details below and click save when you're
                        done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose className="flex space-x-2">
                            <Button type="submit">Save</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
