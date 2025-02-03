// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import OpenAI from 'openai';

// // Load environment variables
// dotenv.config();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Task Schema
// const taskSchema = new mongoose.Schema({
//     description: String,
//     priority: String,
//     subtasks: [String], // New field to store AI-generated subtasks
// });


// const Task = mongoose.model('Task', taskSchema);

// // AI-based Priority Determination using OpenAI API
// // async function determinePriority(description) {
// //     try {
// //         const response = await openai.completions.create({
// //             model: "gpt-3.5-turbo",
// //             messages: [{ role: "system", content: "Classify task priority as High, Medium, or Low based on urgency." },
// //                        { role: "user", content: `Task: ${description}` }],
// //             max_tokens: 10,
// //         });

// //         const priority = response.choices[0].message.content.trim();
// //         return priority === 'High' || priority === 'Medium' ? priority : 'Low';
// //     } catch (error) {
// //         console.error("Error with OpenAI API:", error);
// //         return 'Low';
// //     }
// // }
// // async function determinePriority(description) {
// //     const lowerDesc = description.toLowerCase();

// //     // Step 1: Hardcoded Urgency Rules (Ensures High for time-sensitive tasks)
// //     if (lowerDesc.includes("today") || lowerDesc.includes("tomorrow") || lowerDesc.includes("asap") || lowerDesc.includes("urgent") || lowerDesc.includes("immediately")) {
// //         return "High";
// //     }
// //     if (lowerDesc.includes("important") || lowerDesc.includes("must") || lowerDesc.includes("necessary") || lowerDesc.includes("should") || lowerDesc.includes("need to")) {
// //         return "Medium";
// //     }

// //     // Step 2: Use AI if no strong keyword is found
// //     try {
// //         const response = await openai.completions.create({
// //             model: "gpt-3.5-turbo",
// //             messages: [
// //                 { role: "system", content: "You are an assistant that classifies task priority as High, Medium, or Low based on urgency. Consider deadlines, urgency words, and time-sensitive tasks. Return only 'High', 'Medium', or 'Low'." },
// //                 { role: "user", content: `Task: "${description}"\nClassify the priority:` }
// //             ],
// //             max_tokens: 5,
// //         });

// //         const priority = response.choices[0].message.content.trim();

// //         // Ensure AI response is valid
// //         const validPriorities = ["High", "Medium", "Low"];
// //         return validPriorities.includes(priority) ? priority : "Low"; 
// //     } catch (error) {
// //         console.error("Error with OpenAI API:", error);
// //         return "Low"; // Default fallback
// //     }
// // }
// // AI-based Priority Determination
// function determinePriority(description) {
//     const lowerDesc = description.toLowerCase();

//     // High Priority: Urgent words & time-sensitive phrases
//     const highPriorityKeywords = ['urgent', 'asap', 'immediately', 'deadline', 'today', 'tomorrow', 'this evening', 'now'];
//     if (highPriorityKeywords.some(keyword => lowerDesc.includes(keyword))) {
//         return 'High';
//     }

//     // Medium Priority: Important but not urgent (detects "this week", "next week", "in 3 days")
//     const mediumPriorityKeywords = ['important', 'must', 'necessary', 'should', 'need to'];
//     const mediumPriorityRegex = /\b(this week|next week|in \d+ days|within a few days)\b/;

//     if (mediumPriorityKeywords.some(keyword => lowerDesc.includes(keyword)) || mediumPriorityRegex.test(lowerDesc)) {
//         return 'Medium';
//     }

//     // Default: Low Priority
//     return 'Low';
// }



// // CRUD Operations
// app.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find();
//         res.json(tasks);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // app.post('/tasks', async (req, res) => {
// //     try {
// //         const { description } = req.body;
// //         const priority = await determinePriority(description);
// //         const newTask = new Task({ description, priority });
// //         await newTask.save();
// //         res.json(newTask);
// //     } catch (err) {
// //         res.status(500).json({ error: err.message });
// //     }
// // });
// app.post('/tasks', async (req, res) => {
//     try {
//         const { description } = req.body;
//         const priority = determinePriority(description);
        
//         // Generate AI-based subtasks
//         const subtasks = await generateSubtasks(description);

//         const newTask = new Task({ description, priority, subtasks });
//         await newTask.save();
//         res.json(newTask);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // OpenAI API function to generate subtasks
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// async function generateSubtasks(taskDescription) {
//     try {
//         await delay(2000);
//         const response = await openai.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: "user", content: `Break this task into 3-5 subtasks: "${taskDescription}"` }],
//             max_tokens: 100,
//         });

//         const subtasks = response.choices[0].message.content.split("\n").filter(Boolean);
//         return subtasks;
//     } catch (error) {
//         console.error("OpenAI Error:", error);
//         return [];
//     }
// }


// app.put('/tasks/:id', async (req, res) => {
//     try {
//         const { description } = req.body;
//         const priority = await determinePriority(description);
//         const updatedTask = await Task.findByIdAndUpdate(
//             req.params.id,
//             { description, priority },
//             { new: true }
//         );
//         res.json(updatedTask);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.delete('/tasks/:id', async (req, res) => {
//     try {
//         await Task.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Task deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import axios from 'axios';

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {}).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Task Schema
// const taskSchema = new mongoose.Schema({
//     description: String,
//     priority: String,
//     subtasks: [String], // New field to store AI-generated subtasks
// });

// const Task = mongoose.model('Task', taskSchema);

// // AI-based Priority Determination (same as before)
// function determinePriority(description) {
//     const lowerDesc = description.toLowerCase();

//     const highPriorityKeywords = ['urgent', 'asap', 'immediately', 'deadline', 'today', 'tomorrow', 'this evening', 'now'];
//     if (highPriorityKeywords.some(keyword => lowerDesc.includes(keyword))) {
//         return 'High';
//     }

//     const mediumPriorityKeywords = ['important', 'must', 'necessary', 'should', 'need to'];
//     const mediumPriorityRegex = /\b(this week|next week|in \d+ days|within a few days)\b/;

//     if (mediumPriorityKeywords.some(keyword => lowerDesc.includes(keyword)) || mediumPriorityRegex.test(lowerDesc)) {
//         return 'Medium';
//     }

//     return 'Low';
// }

// // CRUD Operations
// app.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find();
//         res.json(tasks);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.post('/tasks', async (req, res) => {
//     try {
//         const { description } = req.body;
//         const priority = determinePriority(description);
        
//         // Generate AI-based subtasks using Hugging Face API
//         const subtasks = await generateSubtasks(description);

//         const newTask = new Task({ description, priority, subtasks });
//         await newTask.save();
//         res.json(newTask);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Hugging Face API function to generate subtasks
// async function generateSubtasks(taskDescription) {
//     try {
//         const response = await axios.post('https://api-inference.huggingface.co/models/gpt2', {
//             inputs: taskDescription,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`
//             }
//         });

//         // Assuming the Hugging Face model returns subtasks as an array of strings in `generated_text`
//         const subtasks = response.data.generated_text.split("\n").filter(Boolean);
//         return subtasks;
//     } catch (error) {
//         console.error("Hugging Face Error:", error);
//         return [];
//     }
// }

// app.put('/tasks/:id', async (req, res) => {
//     try {
//         const { description } = req.body;
//         const priority = determinePriority(description);
//         const updatedTask = await Task.findByIdAndUpdate(
//             req.params.id,
//             { description, priority },
//             { new: true }
//         );
//         res.json(updatedTask);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.delete('/tasks/:id', async (req, res) => {
//     try {
//         await Task.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Task deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI,)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
    description: String,
    priority: String,
    subtasks: [String], // New field to store AI-generated subtasks
});

const Task = mongoose.model('Task', taskSchema);

// AI-based Priority Determination
function determinePriority(description) {
    const lowerDesc = description.toLowerCase();

    const highPriorityKeywords = ['urgent', 'asap', 'immediately', 'deadline', 'today', 'tomorrow', 'this evening', 'now'];
    if (highPriorityKeywords.some(keyword => lowerDesc.includes(keyword))) {
        return 'High';
    }

    const mediumPriorityKeywords = ['important', 'must', 'necessary', 'should', 'need to'];
    const mediumPriorityRegex = /\b(this week|next week|in \d+ days|within a few days)\b/;

    if (mediumPriorityKeywords.some(keyword => lowerDesc.includes(keyword)) || mediumPriorityRegex.test(lowerDesc)) {
        return 'Medium';
    }

    return 'Low';
}

// CRUD Operations
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const { description } = req.body;
        const priority = determinePriority(description);
        
        // Generate AI-based subtasks using Hugging Face API
        const subtasks = await generateSubtasks(description);

        const newTask = new Task({ description, priority, subtasks });
        await newTask.save();
        res.json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Hugging Face API function to generate subtasks
// async function generateSubtasks(taskDescription) {
//     try {
//         const response = await axios.post('https://api-inference.huggingface.co/models/GPT-J', {
//             // const prompt = `Please generate a list of actionable subtasks for the following task: ${taskDescription}. Make sure each subtask is short and clear. List them one by one.`; 
//             // inputs: `Please break the task "${taskDescription}" into a list of detailed subtasks with actionable steps.`,
//             // inputs: `Break the task "${taskDescription}" into a clear, actionable list of 5 subtasks. Make sure the subtasks are relevant and realistic steps to accomplish the task.`,
//             inputs: `Please break the task "${taskDescription}" into 5 clear and actionable subtasks. The subtasks should be distinct and realistic steps to achieve the goal.`,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`
//             }
//         });

//         // Check if the response contains the expected data
//         if (response.data && response.data[0] && response.data[0].generated_text) {
//             // Split the generated text into lines and filter out empty lines
//             const subtasks = response.data[0].generated_text.split("\n").filter(Boolean);

//             // Limit to the first 5 subtasks and trim whitespace
//             const limitedSubtasks = subtasks.slice(0, 5).map(task => task.trim()).filter(task => task.length > 0);
//             return limitedSubtasks;
//         } else {
//             console.error("Unexpected response structure:", response.data);
//             return [];
//         }
//     } catch (error) {
//         console.error("Hugging Face Error:", error);
//         return [];
//     }
// }

// import axios from 'axios';

async function generateSubtasks(taskDescription) {
  try {
    const response = await axios.post('https://api.cohere.ai/v1/generate', {
      model: "command",  // "command" model is optimized for generating structured responses
      prompt: `Break down the task "${taskDescription}" into 5 actionable subtasks.`,
      max_tokens: 100,
      temperature: 0.7,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      }
    });

    // Extract and format the subtasks
    const subtasks = response.data.generations[0].text.split("\n").map(task => task.trim()).filter(Boolean);
    return subtasks.slice(0, 5);  // Limit to first 5 subtasks
  } catch (error) {
    console.error('Cohere API Error:', error.response ? error.response.data : error.message);
    return [];
  }
}


app.put('/tasks/:id', async (req, res) => {
    try {
        const { description } = req.body;
        const priority = determinePriority(description);
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { description, priority },
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
