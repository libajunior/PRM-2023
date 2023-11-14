import { Alert, Box, Snackbar } from "@mui/material"
import HeaderProfile from "../../components/HeaderProfile"
import TopicList from "../../components/TopicList"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../../hook/useAuth"
import { getProfileByUsername, getTopicsByUsername } from "../../services"

function TopicPage() {

    //PROFILE
    const { user } = useAuth();
    const params = useParams();
    const [profile, setProfile] = useState({});

    //STATE
    const [messageError, setMessageError] = useState('');

    //TOPICS
    const [profileTopics, setProfileTopics] = useState([]);

    useEffect(() => {

        const username = params.username ? params.username : user?.username;

        if (username) {
            getProfileByUsername(username)
                .then(result => {
                    setProfile(result.data);

                    //Carregar topics do usuario (owner)
                    return getTopicsByUsername(username)
                        .then(result=> {
                            setProfileTopics(result.data)
                        })
                })
                .catch(error => {
                    setMessageError(String(error.message))
                })
        }

    }, [])


    return (
        <Box id="topic-page" display="flex" flexDirection="column"
             alignItems="center" gap={3}>
            
            <HeaderProfile user={profile} />

            <TopicList items={profileTopics} />

            <Snackbar
                open={Boolean(messageError)}
                autoHideDuration={6000}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}>

                <Alert severity="error" 
                    variant="filled" 
                    onClose={() => setMessageError('')}>
                    {messageError}
                </Alert>
            </Snackbar>
        </Box>
    )

}

export default TopicPage