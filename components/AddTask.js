import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Pressable,
    Keyboard,
} from "react-native";

const AddTask = (props) => {
    const [task, setTask] = useState();
    const { onAddTaskPress } = props;
    const handleAddTask = () => {
        onAddTaskPress(task);
        Keyboard.dismiss()
        setTask()
    };

    const handleTextChange = (text) => {
        setTask(text)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Write a task"
                value={task}
                onChangeText={handleTextChange}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={styles.text}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F1F1",
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "#558CF6",
        fontWeight: "bold",
        fontSize: 17,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#FFF",
        borderRadius: 8,
        fontSize: 17,
    },
    button: {
        alignItems: "center",
        padding: 10,
    },
});

export default AddTask;