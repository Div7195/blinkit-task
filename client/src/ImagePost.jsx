


const ImagePost = ({imageLink, imageLabel}) => {
    return (
        <>
                <div style={{
                    
                    display:'flex',
                    flexDirection:'column',
                    height:'350px',
                    width:'20%',
                    marginLeft:'10px',
                    
                    padding:'10px'
                }}>
                    <div style={{
                        borderRadius:'10px',
                    display: 'block',
                    width: '70px',
                    background:'#cda8ff',
                    width:'100%',
                    height:200
                   
                }}>
                    <img src={imageLink && imageLink !== ""?imageLink:'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'}alt=" Image" style={{
                   
                    display: 'block',     
                    width: '100%',
                    height: '100%',
                    borderWidth: '0px',
                    outline: 'none' ,
                    
                    objectFit:'cover'
                    
            }} />
                </div>

                    <div style={{
                        marginTop:'5px',
                        fontFamily:'DM Sans',
                        fontSize:'20px',
                        color:'black',
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                            {imageLabel}
                    </div>
                </div>
        </>
    )
}

export default ImagePost