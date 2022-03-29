// import { TableRow } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MobileViewFilters from "../../../components/Common/MobileViewFilters";
import Divider from "../../../components/Common/Divider";
import Button from "../../../components/Common/Button";
import ChatAvatar from "../../../components/Common/BasicAvatar";
import DoubleTicks from "../../../assets/images/doubleticks.png";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Smiley from "../../../assets/images/smiley.png";
import ChatListVector from "../../../assets/images/Vector.png";
import SearchIcon from "../../../assets/images/searchIcon.png";
import SearchVector from "../../../assets/images/searchVector.png";
import WritingVector from "../../../assets/images/writingVector.png";
import SendVector from "../../../assets/images/SendVector.png";
import FilmVector from "../../../assets/images/filmVector.png";
import DocVector from "../../../assets/images/docVector.png";
import ImgVector from "../../../assets/images/imgVector.png";




const Index = () => {
    const [checkedFab, setisCheckedFab] = React.useState(false);

  return (
    <>
      {/* <MobileViewFilters title="Chats" /> */}
      <div >
        <Grid container spacing={1} sx={{ margin: "10px 30px"}}>
            
          <Grid xs={10.5} sm={10.5} md={10.5} lg={4.5} >
            <div className="ChatList" >
                <div>
            <Typography
            className= "ChatHeading"
              sx={{
                marginTop: "20px",
                paddingLeft: "10px",
                
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: 500,
                fontSize: "30px",
                color: "#2A3235",
                
              }}
            >
              Chats 
            </Typography>
            <div className="ChatListVector">
            <Typography
            className= "ChatVector"
                sx={{
                    paddingLeft: "10px",
                    paddingBottom: "10px",
                    fontFamily: "Inter",
                    fontStyle: " normal",
                    fontWeight: 500,
                    fontSize: "18px",
                    color: "#9BAAAF",
                  }}
            >
                Recent chats  
            </Typography>
            <img src={ChatListVector} />
            </div>
            </div>

             <div className="CreateChatBtn">
               <AddIcon 
               className="AddIcon"/>
               <button type="submit" className="ChatButton">
               Create New Chat
               </button>
            {/* <Button
            
            type="submit"   
            color="#149E7A !important"         
            textColor="#FFFFFF"    
            text="Create New Chat"      
            width= "45%"          
            ></Button> */}
            </div>     
          
            </div>

           
            <div className="SearchDiv">
            
            <div className="SearchText">
                <img src={SearchIcon} />

                <input  placeholder="Search" className="SearchBoxTypingField"/>
        
            <Divider orientation="vertical" width="1%"/>
            </div>   

            
            <div className="SearchRight">
            <Typography
            className="MessageBar"
                sx={{
                    paddingLeft: "10px",
                    paddingBottom: "2px",
                    fontFamily: "Inter",
                    fontStyle: " normal",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "#2A3435",
                  }}
            >
                Messages 
            </Typography>
            <img src={SearchVector} style={{padding:"0px 0px 2px 5px"}} />
            </div>
      
      
    
        </div>
    <div className="ListScroller">
        <div className="NewMsgDiv">
            <div className="NewMsgHeaderDiv">
                <div className="NewMsgHeaderLeft">
                    <div>
                        <ChatAvatar 
                        showActiveStatus={true}   
                        online={true} 
                        className="avatarBadgeclassName"
                        anchorOrigin={{ vertical: "top", horizontal: "left" }}
                        />
                    </div>
                    <div>
                    <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "10px",
                    }}
                    >Luy Robin</Typography>
                    <Typography
                     sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#149E7A",
                        paddingLeft: "10px",
                    }}
                    >
                        <span><img src={WritingVector}/></span> Writing</Typography>

                    </div>
                </div>
                <div className="NewMsgHeaderRight">
                    <Typography
                    className="NewMsgHeaderRightText"
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#B3B5C2",
                    }}
                    >1 minute ago</Typography>
                </div>

            </div>
            <div className="NewMsgTextDiv">
                <div className="NewMsgTextLeft">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#757B80",
                    paddingLeft: "10px",
                }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, 
                luctus eros. Aenean luctus varius lacus in imperdiet. 
                Curabitur mi ligula, consequat venenatis nunc accumsan, 
                ornare lobortis nibh. Duis consequat nibh non pulvinar 
                rutrum. Nunc dignissim nibh ac augue feugiat tincidunt. 
                Vestibulum iaculis nisi vitae te
                </Typography>
                </div>
                <div  className="NewMsgTextRight">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#FFA333",
                    width: "20px",
                    borderRadius: "50%",
                    
                    textAlign: "center",
                }}
                >
                            3
                </Typography>
                </div>
            </div>
        </div>
        <div className="NewMsgDiv">
            <div className="NewMsgHeaderDiv">
                <div className="NewMsgHeaderLeft">
                    <div>
                        <ChatAvatar />
                    </div>
                    <div>
                    <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "10px",
                    }}
                    >Luy Robin</Typography>
                    <Typography
                     sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#149E7A",
                        paddingLeft: "10px",
                    }}
                    >
                        last online 3 hours ago </Typography>

                    </div>
                </div>
                <div className="NewMsgHeaderright">
                    <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#B3B5C2",
                    }}
                    >3 hours ago</Typography>
                </div>

            </div>
            <div className="NewMsgTextDiv">
                <div className="NewMsgTextLeft">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#757B80",
                    paddingLeft: "10px",
                }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet. Curabitur mi ligula, consequat venenatis nunc accumsan, ornare lobortis nibh. Duis consequat nibh non pulvinar rutrum. Nunc dignissim nibh ac augue feugiat tincidunt. Vestibulum iaculis nisi vitae te
                </Typography>
                </div>
                <div  className="NewMsgTextRight">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#FFA333",
                    width: "20px",
                    borderRadius: "50%",
                    
                    textAlign: "center",
                }}
                >
                            1
                </Typography>
                </div>
            </div>
        </div>

        <div className="NewMsgDiv">
            <div className="NewMsgHeaderDiv">
                <div className="NewMsgHeaderLeft">
                    <div>
                        <ChatAvatar />
                    </div>
                    <div>
                    <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "10px",
                    }}
                    >Luy Robin</Typography>
                    <Typography
                     sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#FF3737",
                        paddingLeft: "10px",
                    }}
                    >
                        do not disturb</Typography>

                    </div>
                </div>
                <div className="NewMsgHeaderright">
                    <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#B3B5C2",
                    }}
                    >3 days ago</Typography>
                </div>

            </div>
            <div className="NewMsgTextDiv">
                <div className="NewMsgTextLeft">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#757B80",
                    paddingLeft: "10px",
                }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet. Curabitur mi ligula, consequat venenatis nunc accumsan, ornare lobortis nibh. Duis consequat nibh non pulvinar rutrum. Nunc dignissim nibh ac augue feugiat tincidunt. Vestibulum iaculis nisi vitae te
                </Typography>
                </div>
                <div  className="NewMsgTextRight">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#FFA333",
                    width: "20px",
                    borderRadius: "50%",
                    
                    textAlign: "center",
                }}
                >
                            5
                </Typography>
                </div>
            </div>
            
        </div>

        <div className="NewMsgDiv">
            <div className="NewMsgHeaderDiv">
                <div className="NewMsgHeaderLeft">
                    <div>
                        <ChatAvatar />
                    </div>
                    <div>
                    <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "10px",
                    }}
                    >Luy Robin</Typography>
                    <Typography
                     sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#FF3737",
                        paddingLeft: "10px",
                    }}
                    >
                        do not disturb</Typography>

                    </div>
                </div>
                <div className="NewMsgHeaderright">
                    <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#B3B5C2",
                    }}
                    >3 days ago</Typography>
                </div>

            </div>
            <div className="NewMsgTextDiv">
                <div className="NewMsgTextLeft">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#757B80",
                    paddingLeft: "10px",
                }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet. Curabitur mi ligula, consequat venenatis nunc accumsan, ornare lobortis nibh. Duis consequat nibh non pulvinar rutrum. Nunc dignissim nibh ac augue feugiat tincidunt. Vestibulum iaculis nisi vitae te
                </Typography>
                </div>
                <div  className="NewMsgTextRight">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#FFA333",
                    width: "20px",
                    borderRadius: "50%",
                    
                    textAlign: "center",
                }}
                >
                            8
                </Typography>
                </div>
            </div>

        </div>
        <div className="NewMsgDiv">
            <div className="NewMsgHeaderDiv">
                <div className="NewMsgHeaderLeft">
                    <div>
                        <ChatAvatar />
                    </div>
                    <div>
                    <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "10px",
                    }}
                    >Luy Robin</Typography>
                    <Typography
                     sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#FF3737",
                        paddingLeft: "10px",
                    }}
                    >
                        do not disturb</Typography>

                    </div>
                </div>
                <div className="NewMsgHeaderright">
                    <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#B3B5C2",
                    }}
                    >3 days ago</Typography>
                </div>

            </div>
            <div className="NewMsgTextDiv">
                <div className="NewMsgTextLeft">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#757B80",
                    paddingLeft: "10px",
                }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet. Curabitur mi ligula, consequat venenatis nunc accumsan, ornare lobortis nibh. Duis consequat nibh non pulvinar rutrum. Nunc dignissim nibh ac augue feugiat tincidunt. Vestibulum iaculis nisi vitae te
                </Typography>
                </div>
                <div  className="NewMsgTextRight">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#FFA333",
                    width: "20px",
                    borderRadius: "50%",
                    
                    textAlign: "center",
                }}
                >
                            8
                </Typography>
                </div>
            </div>

        </div>
        <div className="NewMsgDiv">
            <div className="NewMsgHeaderDiv">
                <div className="NewMsgHeaderLeft">
                    <div>
                        <ChatAvatar />
                    </div>
                    <div>
                    <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "10px",
                    }}
                    >Luy Robin</Typography>
                    <Typography
                     sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#FF3737",
                        paddingLeft: "10px",
                    }}
                    >
                        do not disturb</Typography>

                    </div>
                </div>
                <div className="NewMsgHeaderright">
                    <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#B3B5C2",
                    }}
                    >3 days ago</Typography>
                </div>

            </div>
            <div className="NewMsgTextDiv">
                <div className="NewMsgTextLeft">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#757B80",
                    paddingLeft: "10px",
                }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet. Curabitur mi ligula, consequat venenatis nunc accumsan, ornare lobortis nibh. Duis consequat nibh non pulvinar rutrum. Nunc dignissim nibh ac augue feugiat tincidunt. Vestibulum iaculis nisi vitae te
                </Typography>
                </div>
                <div  className="NewMsgTextRight">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#FFA333",
                    width: "20px",
                    borderRadius: "50%",
                    
                    textAlign: "center",
                }}
                >
                            8
                </Typography>
                </div>
            </div>

        </div>
        <div className="NewMsgDiv">
            <div className="NewMsgHeaderDiv">
                <div className="NewMsgHeaderLeft">
                    <div>
                        <ChatAvatar />
                    </div>
                    <div>
                    <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "10px",
                    }}
                    >Luy Robin</Typography>
                    <Typography
                     sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#FF3737",
                        paddingLeft: "10px",
                    }}
                    >
                        do not disturb</Typography>

                    </div>
                </div>
                <div className="NewMsgHeaderright">
                    <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#B3B5C2",
                    }}
                    >3 days ago</Typography>
                </div>

            </div>
            <div className="NewMsgTextDiv">
                <div className="NewMsgTextLeft">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#757B80",
                    paddingLeft: "10px",
                }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet. Curabitur mi ligula, consequat venenatis nunc accumsan, ornare lobortis nibh. Duis consequat nibh non pulvinar rutrum. Nunc dignissim nibh ac augue feugiat tincidunt. Vestibulum iaculis nisi vitae te
                </Typography>
                </div>
                <div  className="NewMsgTextRight">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#FFA333",
                    width: "20px",
                    borderRadius: "50%",
                    
                    textAlign: "center",
                }}
                >
                            8
                </Typography>
                </div>
            </div>

        </div>
        <div className="NewMsgDiv">
            <div className="NewMsgHeaderDiv">
                <div className="NewMsgHeaderLeft">
                    <div>
                        <ChatAvatar />
                    </div>
                    <div>
                    <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "10px",
                    }}
                    >Luy Robin</Typography>
                    <Typography
                     sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#FF3737",
                        paddingLeft: "10px",
                    }}
                    >
                        do not disturb</Typography>

                    </div>
                </div>
                <div className="NewMsgHeaderright">
                    <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#B3B5C2",
                    }}
                    >3 days ago</Typography>
                </div>

            </div>
            <div className="NewMsgTextDiv">
                <div className="NewMsgTextLeft">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#757B80",
                    paddingLeft: "10px",
                }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet. Curabitur mi ligula, consequat venenatis nunc accumsan, ornare lobortis nibh. Duis consequat nibh non pulvinar rutrum. Nunc dignissim nibh ac augue feugiat tincidunt. Vestibulum iaculis nisi vitae te
                </Typography>
                </div>
                <div  className="NewMsgTextRight">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#FFA333",
                    width: "20px",
                    borderRadius: "50%",
                    
                    textAlign: "center",
                }}
                >
                            8
                </Typography>
                </div>
            </div>

        </div>
        <div className="NewMsgDiv">
            <div className="NewMsgHeaderDiv">
                <div className="NewMsgHeaderLeft">
                    <div>
                        <ChatAvatar />
                    </div>
                    <div>
                    <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "10px",
                    }}
                    >Luy Robin</Typography>
                    <Typography
                     sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#FF3737",
                        paddingLeft: "10px",
                    }}
                    >
                        do not disturb</Typography>

                    </div>
                </div>
                <div className="NewMsgHeaderright">
                    <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#B3B5C2",
                    }}
                    >3 days ago</Typography>
                </div>

            </div>
            <div className="NewMsgTextDiv">
                <div className="NewMsgTextLeft">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#757B80",
                    paddingLeft: "10px",
                }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet. Curabitur mi ligula, consequat venenatis nunc accumsan, ornare lobortis nibh. Duis consequat nibh non pulvinar rutrum. Nunc dignissim nibh ac augue feugiat tincidunt. Vestibulum iaculis nisi vitae te
                </Typography>
                </div>
                <div  className="NewMsgTextRight">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#FFA333",
                    width: "20px",
                    borderRadius: "50%",
                    
                    textAlign: "center",
                }}
                >
                            8
                </Typography>
                </div>
            </div>

        </div>
        <div className="NewMsgDiv">
            <div className="NewMsgHeaderDiv">
                <div className="NewMsgHeaderLeft">
                    <div>
                        <ChatAvatar />
                    </div>
                    <div>
                    <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "10px",
                    }}
                    >Luy Robin</Typography>
                    <Typography
                     sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#FF3737",
                        paddingLeft: "10px",
                    }}
                    >
                        do not disturb</Typography>

                    </div>
                </div>
                <div className="NewMsgHeaderright">
                    <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#B3B5C2",
                    }}
                    >3 days ago</Typography>
                </div>

            </div>
            <div className="NewMsgTextDiv">
                <div className="NewMsgTextLeft">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#757B80",
                    paddingLeft: "10px",
                }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet. Curabitur mi ligula, consequat venenatis nunc accumsan, ornare lobortis nibh. Duis consequat nibh non pulvinar rutrum. Nunc dignissim nibh ac augue feugiat tincidunt. Vestibulum iaculis nisi vitae te
                </Typography>
                </div>
                <div  className="NewMsgTextRight">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#FFA333",
                    width: "20px",
                    borderRadius: "50%",
                    
                    textAlign: "center",
                }}
                >
                            8
                </Typography>
                </div>
            </div>

        </div>
        <div className="NewMsgDiv">
            <div className="NewMsgHeaderDiv">
                <div className="NewMsgHeaderLeft">
                    <div>
                        <ChatAvatar />
                    </div>
                    <div>
                    <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "10px",
                    }}
                    >Luy Robin</Typography>
                    <Typography
                     sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#FF3737",
                        paddingLeft: "10px",
                    }}
                    >
                        do not disturb</Typography>

                    </div>
                </div>
                <div className="NewMsgHeaderright">
                    <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#B3B5C2",
                    }}
                    >3 days ago</Typography>
                </div>

            </div>
            <div className="NewMsgTextDiv">
                <div className="NewMsgTextLeft">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#757B80",
                    paddingLeft: "10px",
                }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet. Curabitur mi ligula, consequat venenatis nunc accumsan, ornare lobortis nibh. Duis consequat nibh non pulvinar rutrum. Nunc dignissim nibh ac augue feugiat tincidunt. Vestibulum iaculis nisi vitae te
                </Typography>
                </div>
                <div  className="NewMsgTextRight">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#FFA333",
                    width: "20px",
                    borderRadius: "50%",
                    
                    textAlign: "center",
                }}
                >
                            8
                </Typography>
                </div>
            </div>

        </div>
        <div className="NewMsgDiv">
            <div className="NewMsgHeaderDiv">
                <div className="NewMsgHeaderLeft">
                    <div>
                        <ChatAvatar />
                    </div>
                    <div>
                    <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "10px",
                    }}
                    >Luy Robin</Typography>
                    <Typography
                     sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#FF3737",
                        paddingLeft: "10px",
                    }}
                    >
                        do not disturb</Typography>

                    </div>
                </div>
                <div className="NewMsgHeaderright">
                    <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#B3B5C2",
                    }}
                    >3 days ago</Typography>
                </div>

            </div>
            <div className="NewMsgTextDiv">
                <div className="NewMsgTextLeft">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#757B80",
                    paddingLeft: "10px",
                }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet. Curabitur mi ligula, consequat venenatis nunc accumsan, ornare lobortis nibh. Duis consequat nibh non pulvinar rutrum. Nunc dignissim nibh ac augue feugiat tincidunt. Vestibulum iaculis nisi vitae te
                </Typography>
                </div>
                <div  className="NewMsgTextRight">
                <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#FFA333",
                    width: "20px",
                    borderRadius: "50%",
                    
                    textAlign: "center",
                }}
                >
                            8
                </Typography>
                </div>
            </div>

        </div>
        </div>
        
          </Grid>

          <div style={{width:"20px"}}>

          </div>

          <Grid xs={10} sm={10}  md={10} lg={6}sx={{backgroundColor:"white",marginLeft:"15px", padding:"30px",height:"fit-content", marginTop:"20px",borderRadius:"10px"}}>
            <div className="ChatBoxHeader" >
                <div className="ChatBoxAvatar">
                    <ChatAvatar                          
                      className="AvatarClass" 
                      sx={{marginTop:"20px"}}            
                    />
                    <div>
            <Typography
              sx={{
                marginTop: "10px",
                paddingLeft: "10px",
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: 500,
                fontSize: "18px",
                lineHight: "34px",
                color: "#2A3235",
              }}
            >
              Nika Jerrardo 
            </Typography>
            <Typography
              sx={{
                
                paddingLeft: "12px",
               
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: 600,
                fontSize: "14px",
                lineHight: "15px",
                color: "#149E7A",
              }}
            >
              Avis Rent a car 
            </Typography>
            </div>
            </div>
            <div >
               
               <button type="submit" className="ChatButton" style={{backgroundColor:"#FFA333"}}>
               Book Me 
               </button>
            {/* <div className="ChatBoxHeaderBtn">
                <Button 
                type="submit"   
                color="#FFA333 !important"         
                textColor="#FFFFFF"    
                text="Book Me"      
                width= "100%"
                 /> */}
            </div>
            </div>
            <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
            <div className="ChatboxScroller">
            <div className="ChatReceived">
                <div className="AvatarClass">
             <ChatAvatar                           
                className="AvatarClass" 
                 
                />
                </div>

              <div className="ReceivedText">
                  <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        maxWidth: "80%",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet.
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "15px 20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Can i help?
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                
              </div>
            </div>
            <div className="SentDiv">
            <div className="SentText">
            <Typography
                    sx={{
                
                        padding: "15px",
                        marginBottom: "4px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        border: "1px solid #F0F0F0",
                        borderRadius: "10px 10px 0px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#2A3235",
                        
                      }}
                >
                Hey! Okay, send out
                </Typography>
                      <img src={DoubleTicks} />
            </div>
            <div className="SentTime">
                <Typography
                sx={{
                    fontFamily: "Inter",
                    fontStyle: " normal",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#B7C1C5",
                  }}
                >
                1 days ago
                </Typography>
            </div>
            </div><div className="ChatReceived">
                <div className="AvatarClass">
             <ChatAvatar                           
                className="AvatarClass" 
                 
                />
                </div>

              <div className="ReceivedText">
                  <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        maxWidth: "80%",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet.
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "15px 20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Can i help?
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                
              </div>
            </div>
            <div className="SentDiv">
            <div className="SentText">
            <Typography
                    sx={{
                
                        padding: "15px",
                        marginBottom: "4px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        border: "1px solid #F0F0F0",
                        borderRadius: "10px 10px 0px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#2A3235",
                        
                      }}
                >
                Hey! Okay, send out
                </Typography>
                      <img src={DoubleTicks} />
            </div>
            <div className="SentTime">
                <Typography
                sx={{
                    fontFamily: "Inter",
                    fontStyle: " normal",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#B7C1C5",
                  }}
                >
                1 days ago
                </Typography>
            </div>
            </div><div className="ChatReceived">
                <div className="AvatarClass">
             <ChatAvatar                           
                className="AvatarClass" 
                 
                />
                </div>

              <div className="ReceivedText">
                  <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        maxWidth: "80%",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet.
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "15px 20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Can i help?
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                
              </div>
            </div>
            <div className="SentDiv">
            <div className="SentText">
            <Typography
                    sx={{
                
                        padding: "15px",
                        marginBottom: "4px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        border: "1px solid #F0F0F0",
                        borderRadius: "10px 10px 0px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#2A3235",
                        
                      }}
                >
                Hey! Okay, send out
                </Typography>
                      <img src={DoubleTicks} />
            </div>
            <div className="SentTime">
                <Typography
                sx={{
                    fontFamily: "Inter",
                    fontStyle: " normal",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#B7C1C5",
                  }}
                >
                1 days ago
                </Typography>
            </div>
            </div><div className="ChatReceived">
                <div className="AvatarClass">
             <ChatAvatar                           
                className="AvatarClass" 
                 
                />
                </div>

              <div className="ReceivedText">
                  <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        maxWidth: "80%",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet.
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "15px 20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Can i help?
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                
              </div>
            </div>
            <div className="SentDiv">
            <div className="SentText">
            <Typography
                    sx={{
                
                        padding: "15px",
                        marginBottom: "4px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        border: "1px solid #F0F0F0",
                        borderRadius: "10px 10px 0px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#2A3235",
                        
                      }}
                >
                Hey! Okay, send out
                </Typography>
                      <img src={DoubleTicks} />
            </div>
            <div className="SentTime">
                <Typography
                sx={{
                    fontFamily: "Inter",
                    fontStyle: " normal",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#B7C1C5",
                  }}
                >
                1 days ago
                </Typography>
            </div>
            </div><div className="ChatReceived">
                <div className="AvatarClass">
             <ChatAvatar                           
                className="AvatarClass" 
                 
                />
                </div>

              <div className="ReceivedText">
                  <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        maxWidth: "80%",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet.
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "15px 20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Can i help?
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                
              </div>
            </div>
            <div className="SentDiv">
            <div className="SentText">
            <Typography
                    sx={{
                
                        padding: "15px",
                        marginBottom: "4px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        border: "1px solid #F0F0F0",
                        borderRadius: "10px 10px 0px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#2A3235",
                        
                      }}
                >
                Hey! Okay, send out
                </Typography>
                      <img src={DoubleTicks} />
            </div>
            <div className="SentTime">
                <Typography
                sx={{
                    fontFamily: "Inter",
                    fontStyle: " normal",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#B7C1C5",
                  }}
                >
                1 days ago
                </Typography>
            </div>
            </div>
            <div className="ChatReceived">
                <div className="AvatarClass">
             <ChatAvatar                           
                className="AvatarClass" 
                 
                />
                </div>

              <div className="ReceivedText">
                  <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        maxWidth: "80%",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet.
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "15px 20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Can i help?
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                
              </div>
            </div>
            <div className="SentDiv">
            <div className="SentText">
            <Typography
                    sx={{
                
                        padding: "15px",
                        marginBottom: "4px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        border: "1px solid #F0F0F0",
                        borderRadius: "10px 10px 0px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#2A3235",
                        
                      }}
                >
                Hey! Okay, send out
                </Typography>
                      <img src={DoubleTicks} />
            </div>
            <div className="SentTime">
                <Typography
                sx={{
                    fontFamily: "Inter",
                    fontStyle: " normal",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#B7C1C5",
                  }}
                >
                1 days ago
                </Typography>
            </div>
            </div>

            <div className="ChatReceived">
                <div className="AvatarClass">
             <ChatAvatar                           
                className="AvatarClass"    
                />
                </div>

              <div className="ReceivedText">
                  <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        maxWidth: "80%",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Vestibulum eget augue consectetur, mattis turpis et, luctus eros. Aenean luctus varius lacus in imperdiet.
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
                <div className="ReceivedDots">
                <Typography
                    sx={{
                
                        padding: "15px 20px",
                        marginBottom: "8px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        borderRadius: "0px 10px 10px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#EAFFEB",
                        backgroundColor: "#149E7A",
                      }}
                >
                Can i help?
                </Typography>
                <Typography className="Dots">...</Typography>
                </div>
              </div>
            </div>
                      <div className="TimeDivider">
            <Divider width="35%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
            <Typography
            
            className="DividerText"
            >3 Days ago</Typography>
            <Divider width="35%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
            </div>
                      <div className="SentDiv">
            <div className="SentText">
            <Typography
                    sx={{
                
                        padding: "15px",
                        marginBottom: "4px",
                        fontFamily: "Inter",
                        
                        maxWidth: "fit-content",
                        border: "1px solid #F0F0F0",
                        borderRadius: "10px 10px 0px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#2A3235",
                        
                      }}
                >
                Hey! Okay, send out
                </Typography>
                      <img src={DoubleTicks} />
            </div>
            <div className="SentTime">
                <Typography
                sx={{
                    fontFamily: "Inter",
                    fontStyle: " normal",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#B7C1C5",
                  }}
                >
                4 days ago
                </Typography>
            </div>
            </div>
            </div>
            <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" className="MessageDivider"/>
            
        <div className="MessageDiv">
            
            <div className="MessageText">
                
                
          <div className="FabFlow" >
          {/* {checkedFab ? (
                    
                    <>
                        <Fab size="small" color="secondary" className="FabIcons" >
                      <img src={DocVector}/>
                    </Fab>
                        <Fab size="small" color="secondary" className="FabIcons" >
                      <img src={FilmVector}/>
                    </Fab>
                        <Fab size="small" color="secondary" className="FabIcons" >
                      <img src={ImgVector}/>
                    </Fab>
                    </>             
      ) : (
          ""
          )} */}
                <Fab size="small" color="secondary" aria-label="add" onClick={(e) => setisCheckedFab(!checkedFab)}>
                  <AddIcon />
                </Fab>
                </div>

                <input  placeholder="Type a message here" className="ChatBoxTypingField"/>
                
            </div>    
            <div className="MessageRight">
                <img src={Smiley}  />
                <Fab size="small" color="secondary" aria-label="add" sx={{margin:"10px"}}>
                  <img src={SendVector}/>
                </Fab>
            </div>
      
      
    
        </div>
          </Grid>

          
        </Grid>
      </div>


    
       
      
    </>
  );
};

export default Index;


