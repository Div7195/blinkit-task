import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DataContext } from "./context/DataProvider";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { FormControl } from "@mui/material";
import { getAccessToken } from "./utils/util.js";
import ImageIcon from '@mui/icons-material/Image';
import { useLocation } from 'react-router-dom';
import ImagePost from "./ImagePost.jsx";
const Home = () => {
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const [open, setOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null)
    const [posts, setPosts] = useState({})
    const [callApiState, setCallApi] = useState(0)
    const navigate = useNavigate();
  const location = useLocation();
    const postInitialValues = {
        userId:account.id,
        imageLink:'',
        imageLabel:''
    };
    const [postState, setPost] = useState(postInitialValues)
    const handleClickOpen = () => {
        setPost(postInitialValues)
        setOpen(true);
    };

    const handleClose = () => {
        setPost(postInitialValues)
        setOpen(false);
  };


  const addNewPostApi = async()=> {
    
    let newPost = postState
    const settings = {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'authorization' : getAccessToken()
        }
        }
        try {
            console.log(settings.body)
            const fetchResponse = await fetch(`https://blinkit-task-backend.vercel.app/saveImage?userId=${account.id}`, settings);
            const response = await fetchResponse.json();
            setPost(postInitialValues)
            handleClose()
            setCallApi(callApiState+1)
        } catch (e) {
            setPost(postInitialValues)
            return e;
        }    
}

useEffect(() => {
    
    const myFunction = async() => {
        const url = `https://blinkit-task-backend.vercel.app/getAllImages?userId=${account.id}`;
        const settings = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization : getAccessToken()
        }
        };
        try {
            const fetchResponse = await fetch(url, settings);
            const response = await fetchResponse.json();
            setPosts(response.objArrayOfPosts);
            
            } catch (e) {
            console.log(e);
            }
    
        }
        
        myFunction()

  
}, [callApiState])


    useEffect(() => {
        const storeImageAndGetLink = async() => {
          
          if(imageFile){
              const data = new FormData();
              data.append("name", imageFile.name);
              data.append("file", imageFile);
              
              const settings = {
                  method: "POST",
                  body: data,
                  headers: {
                      'authorization' : getAccessToken()
                  },
                  
                  }
                  try {
                      const fetchResponse = await fetch(`https://blinkit-task-backend.vercel.app/image/upload`, settings);
                      const response = await fetchResponse.json();
                      setPost({...postState, imageLink:response});
                      console.log(postState)
                  } catch (e) {
                      
                      return e;
                  }
          }
        }
        storeImageAndGetLink();
      }, [imageFile])
    return(
        <>
            <div style={{
                display:'flex',
                flexDirection:'column'
            }}>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    width:'100%'
                }}>
                    
                        <div style={{
                            margin:'auto',
                            width:'50%',
                            background:'green',
                            fontFamily:'DM Sans',
                            fontSize:'30px',
                            marginLeft:'20px',
                            borderRadius:'15px',
                            display:'flex',
                            color:'white',
                            alignItems:'center',
                            justifyContent:'center',
                            cursor:'pointer'
                        }}
                        onClick={() => {handleClickOpen()}}
                        >
                              <AddCircleIcon style={{
                                fontSize:"40px"
                              }}/>  Add new picture
                        </div>

                             

                              <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Start new image post</DialogTitle>
                    <DialogContent>
                    <div style={{
                        display:'flex',
                        justifyContent:'center',
                        flexDirection:'column',
                        marginTop:'10px',
                        fontSize:'15px'}}>

                      

                        
                <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px',
            }}>
                
                
            </div>
            

                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginTop:'15px'
                    }}>
                        <div style={{
                            color:'black'
                        }}>
                            Image label
                        </div>

                        <div>
                            <TextField
                                name="imageLabel"
                                value={postState.imageLabel}
                                onChange={(e) => {
                                    setPost({...postState, [e.target.name]: e.target.value})
                                    console.log(postState)
                                }}
                                id="filled-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={4}
                                variant="filled"
                                    style={{width:500}}
                                />
                        </div>
                </div>
                
                <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginTop:'15px'
                    }}>
                        <div style={{
                            color:'black'
                        }}>
                            Attach the image
                        </div>
                        <div>
                            <FormControl>
                                <label htmlFor="fileInput">
                                <ImageIcon style={{
                                    cursor:'pointer',
                                    fontSize:'30px'
                                }}/>
                                </label>
                                <input type="file"
                                id="fileInput"
                                
                                style={{
                                    display:'none'
                                }}
                                onChange={(e) => setImageFile(e.target.files[0])}
                                >
                                
                                </input>
                            </FormControl>
                        </div>
                        
                </div>
                

                    
               
                </div>
               
                
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={()=>{addNewPostApi(postState)}}>Save</Button>
                    </DialogActions>
             </Dialog>

                        <div style={{
                            marginLeft:'auto',
                            marginRight:'10px',
                            background:'pink',
                            color:'green',
                            cursor:'pointer',
                            padding:'5px',
                            fontFamily:'DM Sans',
                            fontSize:'25px',
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:'15px'
                        }}
                        onClick={() => { if(location.pathname.includes('login') === false) setAccount({username :'', loggedIn:false, id:'' }); navigate('/login')}}
                        >
                                LOGOUT
                        </div>

                </div>

                <div style={{
                    marginTop:'60px',
                    width:'100%',
                    marginLeft:'30px',
                    display:'flex',
                    flexDirection:'row',
                    flexWrap:'wrap'
                }}>
                        {
                            posts && posts.length > 0 ?
                            posts.map(e => (
                                <ImagePost imageLink = {e.imageLink} imageLabel = {e.imageLabel}/>
                            ))
                            :
                            <>

                            </>
                        }

                </div>
            </div>
        </>
    )
}
export default Home
