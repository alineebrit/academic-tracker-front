import {useContext} from "react";
import FloatingCreateButton from "../../components/FloatingButton/index";
import Header from "../../components/Header";
import Sheet from "../../components/Sheets";
import TaskList from "../../components/TaskList";
import {AuthContext} from "../../contexts/AuthContext";

const Dashboard = () => {
    const auth = useContext(AuthContext);
    return (
        <div>
            <Header></Header>
            <Sheet></Sheet>
            <FloatingCreateButton />
            <div style={{paddingLeft: "2%"}}>
                <div>
                    <TaskList grupoId={auth?.user?.grupoId}></TaskList>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
