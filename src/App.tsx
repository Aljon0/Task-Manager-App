import Dashboard from "./components/Dashboard";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen transition-colors duration-200 bg-slate-50 dark:bg-gray-900">
          <Dashboard />
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
