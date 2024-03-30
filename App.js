import { KeyboardAvoidingView, StyleSheet, Text, View, Platform, FlatList } from "react-native";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
    const [items, setItems] = useState([]);

    const flatListData = items.map((item, index) => ({
        id: index.toString(), 
        isCompleted: item.isCompleted,
        text: item.text,
        onPress: item.onPress
    }));

    const filteredData = flatListData.filter(item => item.isCompleted !== 2);
    const sortedData = filteredData.slice().sort((a, b) => a.isCompleted - b.isCompleted);
    

    const handleTaskPressed = async (index) => {
        let updatedTasks = [...items];
        updatedTasks[index].isCompleted = updatedTasks[index].isCompleted + 1;
        setItems(updatedTasks);

        try {
            // Save the updated task list to AsyncStorage
            await AsyncStorage.setItem("debug", JSON.stringify([updatedTasks]));
        } catch (error) {
            console.error("Error saving tasks to AsyncStorage: ", error);
        }
    };

    const onAddTaskPress = async (text) => {
        // Update the tasks
        //console.log(text)
        if (text == undefined) { console.error("Text is empty") }
        else {
            const updatedTasks = [...items, { text: text, isCompleted: 0 }]
            setItems(updatedTasks);

            try {
                await AsyncStorage.setItem("debug", JSON.stringify(updatedTasks));
            } catch (error) {
                console.error("Error saving tasks to AsyncStorage: ", error);
            }
        }
    };

    useEffect(() => {
        // Load the task list from AsyncStorage
        const loadTasks = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem("debug");
                if (storedTasks !== null) {
                    setItems(JSON.parse(storedTasks));
                }
            } catch (error) {
                console.error("Error loading tasks from AsyncStorage: ", error);
            }
        };

        loadTasks();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Today's Tasks</Text>
                <View style={styles.items}>
                    {/*{items.map((item, index) => {
                        return <Task text={item.text} isCompleted={item.isCompleted} key={index}
                            onPress={() => handleTaskPressed(index)}></Task>;
                    })}*/}
                    <FlatList
                        data={sortedData}
                        renderItem={({ item }) => <Task text={item.text} isCompleted={item.isCompleted ? true : false}
                            onPress={() => handleTaskPressed(item.id)} />}
                        keyExtractor={item => item.id}
                    />

                                       
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.addTaskContainer}
            >
                <AddTask onAddTaskPress={onAddTaskPress} />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F1F1",
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 34,
        fontWeight: "bold",
    },
    items: {
        marginTop: 32,
    },
    addTaskContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
});