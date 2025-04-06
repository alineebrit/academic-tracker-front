import FloatingCreateButton from "../../components/FloatingButton/index";
import Header from "../../components/Header";
import Sheet from "../../components/Sheets";
import TaskList from "../../components/TaskList";

const Dashboard = () => {
    return (
        <div>
            <Header></Header>
            <Sheet></Sheet>
            <FloatingCreateButton />
            <div style={{paddingLeft: "2%"}}>
                <div>
                    <TaskList></TaskList>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
