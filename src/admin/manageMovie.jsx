import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import Container from '@material-ui/core/Container';
import Axios from 'axios'
import {EditAttributesRounded, DeleteForeverRounded} from '@material-ui/core' 
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux'


// MATERIAL UI (Google) >> REACT HOOKS

class manageMovie extends React.Component{
    // state
    // lifecycle
    // function
    // render
    state = {
        data : [],
        modalOpen : false,
        genreList : [],
        showSynopsis : false,
        currentSynopsis : null,
        selectedEdit : 0,
    }
    componentDidMount(){
        this.getDataMovies()
        
    }
    getDataMovies = () => {
        Axios.get("http://localhost:2000/movies")
        .then((result)=>{
            
            this.setState({
                data : result.data 
            })
           
        })
        .catch((error) => {
            console.log(error)
        })
    }

    
    synopsisPrint = (text) => {
        //PANGGIL synopsisprint(synopsis, id)
        // IF state currentsyn === id >> print semua
        
        // else print V
        var arr = text.split(" ")
        var synarr = []
        for(var i = 0; i<5; i++){
            synarr.push(arr[i])
        }
        return synarr.join(" ")
        
    }
    
    printMovieData = () => {

        
        this.state.data.map((val) => {
            if(this.state.genreList.indexOf(val.genre) === -1){
                this.state.genreList.push(val.genre)
            }
        })
        console.log(this.state)
        

        var output = this.state.data.map((val,index) => {
            if(val.id === this.state.selectedEdit){
                return(
                    <TableRow>
                    <TableCell>{index+1}</TableCell>
                    <TableCell><input type="text" ref="inputtitle" className="form-control" defaultValue={val.title}/></TableCell>
                    <TableCell><input type="text" ref="inputgenre" className="form-control" defaultValue={val.genre}/></TableCell>
                    <TableCell><input type="text" ref="inputimage" className="form-control" defaultValue={val.image}/></TableCell>
                    <TableCell><input type="text" ref="inputbannerimg" className="form-control" defaultValue={val.bannerimg}/></TableCell>
                    <TableCell><input type="text" ref="inputdirector" className="form-control"  defaultValue={val.director}/></TableCell>
                    <TableCell><input type="text" ref="inputpt" className="form-control"  defaultValue={val.playingTime.join(",")}/></TableCell>
                    <TableCell><input type="text" ref="inputdur" className="form-control"  defaultValue={val.duration}/></TableCell>
                    <TableCell><textarea className="form-control" ref="inputsynopsis" defaultValue={val.synopsis}/></TableCell>
                    <TableCell>
                        <div><input type="button" value="save" className="btn btn-block btn-success btn-sm" onClick={() => this.btnSaveEditClick()} ></input>
                        <input type="button" value="cancel" className="btn btn-block btn-danger btn-sm" onClick={() => this.setState({selectedEdit : 0})}></input></div>
                    </TableCell>
                </TableRow>
                )
            }else{
                return(
                    <TableRow>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{val.title}</TableCell>
                        <TableCell>{val.genre}</TableCell>
                        <TableCell><img src={val.image} height="50px" alt=""></img></TableCell>
                        <TableCell><img src={val.bannerimg} height="50px" alt=""></img></TableCell>
                        <TableCell>{val.director}</TableCell>
                        <TableCell>{val.playingTime.join(",")}</TableCell>
                        <TableCell>{val.duration} Minutes</TableCell>
                        <TableCell> 
                        {
                        this.state.showSynopsis === false ? 
                        <div>
                        {this.synopsisPrint(val.synopsis)}
                        <p class="font-weight-bold readmore"  onClick={() => this.setState({showSynopsis : true, currentSynopsis : val.id})}>...Read More</p>
                        </div>
                        :
                        this.state.showSynopsis === true && ((this.state.currentSynopsis === val.id) === false) ?
                        <div>
                        {this.synopsisPrint(val.synopsis)}
                        <p class="font-weight-bold readmore"  onClick={() => this.setState({showSynopsis : true, currentSynopsis : val.id})}>...Read More</p>
                        </div>
                        :
                        this.state.showSynopsis === true &&  ((this.state.currentSynopsis === val.id) === true) ?
                        <div>
                        {this.fullSynopsisPrint()}
                        </div>
                        :
                        null
                        }
                        </TableCell>
                        <TableCell>
                            <div><input type="button" value="edit" className="btn btn-block btn-primary btn-sm" onClick={()=>this.buttonEditClick(val.id)}></input>
                            <input type="button" value="delete" className="btn btn-block btn-danger btn-sm" onClick={()=>this.buttonDeleteClick(val.id, index)}></input></div>
                        </TableCell>
                    </TableRow>
                )
            }
           
        })
        
        return output
    }
    closeModal = () => {
        this.setState({
            modalOpen : false
        })
        console.log(this.state)
       
    }
    fullSynopsisPrint = () => {
        var id = this.state.currentSynopsis -1 // -1 karena index state.data dari 0 
        return(
            <p>{this.state.data[id].synopsis}</p>
        )
        
        
    }
    validateForm = () => {
        var title = this.refs.inputtitle.value
        var director = this.refs.inputdirector.value
        var genre = this.refs.inputgenre.value
        var image = this.refs.inputurl.value
        var playingTime = []
        var duration = this.refs.inputduration.value
        var bannerimg = this.refs.inputbannerimg.value
        var video = this.refs.inputvideo.value
        var booked = []
        
        
        // RADIO BUTTON

        // if(this.refs.radio1.refs.radio1Inner.checked === true){
        //     playingTime.push(9)

        // }
        // if(this.refs.radio2.refs.radio2Inner.checked === true){
        //     playingTime.push(14)
        // }
        // if(this.refs.radio3.refs.radio3Inner.checked === true){
        //     playingTime.push(17)
        // }
        // if(this.refs.radio4.refs.radio4Inner.checked === true){
        //     playingTime.push(20)
        // }
        // if(this.refs.radio5.refs.radio5Inner.checked === true){
        //     playingTime.push(22)
        // }
        var listtime = [9,14,17,20,22]
        for(var i = 1; i<=5;i++){
            if(this.refs['radio' + i].refs['radio'+i+'Inner'].checked === true){
                playingTime.push(listtime[i-1])
            }
        }


       

        // END RADIO BUTTON 
        
        var synopsis = this.refs.inputsynopsis.value
        if(title.replace(/\s/g, "") === "" || director.replace(/\s/g, "") === ""
         || genre.replace(/\s/g, "") === "" || image.replace(/\s/g, "") === ""
         || playingTime.length === 0 || duration.replace(/\s/g, "") === "" || synopsis.replace(/\s/g, "") === "" || video.replace(/\s/g, "")=== "")
         
         {
           // warning text
           return document.getElementById("warningbutton").innerHTML = "harap mengisi form yang kosong !  "
        }
       
        // URL VALIDATION
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/; // Dari internet
        if(!regex.test(image) || !regex.test(bannerimg)) {
            return document.getElementById("warningbutton").innerHTML = "url tidak valid!  "
        } else {
            
        }

        var data = {
            genre : genre,
            title : title,
            duration : duration,
            synopsis : synopsis,
            playingTime : playingTime,
            director : director,
            image : image,
            bannerimg : bannerimg,
            video : video,
            booked : []

            
            
        }

        Axios.post('http://localhost:2000/movies', data)
        .then((res)=>{
            
            window.alert("berhasil add data")
            var movieData = this.state.data
            movieData.push(res.data)
            this.setState({
                data : movieData
            })
            this.closeModal()
        })
        .catch((err)=> {
            console.log(err)
        })
        
        
        
   
        
        // const axios = require('axios');
        // axios.post('http://localhost:2000/movies', {
        //     id: this.state.data.length,
        //     genre: genre,
        //     title: title,
        //     duration: ,
        //     synopsis: "Pasangan suami istri Ed Warren (Patrick Wilson) dan Lorraine Warren (Vera Farmiga) sepakat untuk meletakkan boneka Annabelle di ruang khusus mereka. Dibalik lemari kaca suci dan mendapat berkat dari seorang pendeta. Namun malapetaka datang saat Annabelle membangunkan roh-roh jahat yang ada di ruangan itu. Putri pasangan ini, Judy Warren (Mckenna Grace) dan temannya menjadi target teror baru Annabelle dan iblis jahat lainnya.",
        //     playingTime: [
        //     9,
        //     14,
        //     20
        //     ],
        //     director: "Gary Dauberman",
        //     image: "https://media.21cineplex.com/webcontent/gallery/pictures/156074568118284_452x647.jpg"
        //     },).then(resp => {
        //     console.log(resp.data);
        // }).catch(error => {
        //     console.log(error);
        // });   

    }
    printGenreList = () => {
        var jsx = this.state.genreList.map((val) => {
            return(
                <option value={val}>{val}</option>
            )
            
        })
        return jsx
    }           
        
    buttonEditClick = (id) => {
        this.setState({
            selectedEdit : id
        })
    }
    
    buttonDeleteClick = (id, i) => {
        var confirm = window.confirm("Are you sure to delete this data ? ")
        if(confirm){
            Axios.delete('http://localhost:2000/movies/'+id)
            .then((res)=>{
                alert('Delete Data Success')
                var data = this.state.data
                data.splice(i, 1)
                this.setState({
                    data : data
                })
            })
            .catch((err) => {

            })
        }
    }
    btnSaveEditClick = () => {
        var title = this.refs.inputtitle.value
        var director = this.refs.inputdirector.value
        var genre = this.refs.inputgenre.value
        var image = this.refs.inputimage.value
        var playingTime = this.refs.inputpt.value.split(',')
        var duration = this.refs.inputdur.value
        var synopsis = this.refs.inputsynopsis.value
        var bannerimg = this.refs.inputbannerimg.value
        var video = this.state.data[this.state.selectedEdit-1].video 
        var booked = []
      
       

        if(title.replace(/\s/g, "") === "" || director.replace(/\s/g, "") === ""
         || genre.replace(/\s/g, "") === "" || image.replace(/\s/g, "") === ""
         || playingTime.length === 0 || duration.replace(/\s/g, "") === "" || synopsis.replace(/\s/g, "") === "")
         
         {
           // warning text
            return false
        }
        var data = {
            genre : genre,
            title : title,
            duration : duration,
            synopsis : synopsis,
            playingTime : playingTime,
            director : director,
            image : image,
            bannerimg : bannerimg,
            video : video,
            booked : booked
        }
        var confirm = window.confirm("Apakah anda yakin untuk mengedit data ? ")
        if(confirm){
            Axios.put('http://localhost:2000/movies/' + this.state.selectedEdit, data)
            .then((res) => {
            console.log("INI RES DATA " , res.data)
            var data = this.state.data
            data[this.state.selectedEdit-1] = res.data
            // console.log("total data after update", data)


            // GAK JALAN
            // var editeddata = {
            //     genre : genre,
            //     title : title,
            //     duration : duration,
            //     synopsis : synopsis,
            //     playingTime : playingTime,
            //     director : director,
            //     image : image
            // }
            // this.state.data[this.state.selectedEdit] = editeddata

            window.alert("Data sudah berhasil untuk diedit ")
            this.setState({
                data : this.state.data,
                selectedEdit : 0
            })
            
        })
        .catch((err)=>{
            console.log(err)
            
        })
        }
        else{
            
        }

        
    }

    render(){
        if(this.props.IS_ADMIN === false){
            return(
                <h1 className="pt-5"> You do not have permission to modify movie data</h1>
            )
        }

        return(
            <div class="mycontainer">
                
                <Container fixed>
                    <h1 className="pt-5 filtercss"><center>Manage Movie Page</center></h1>
                    <input type="button" value="Add Data" className="btn btn-success mb-2 mt-2" onClick={() => this.setState({modalOpen : true})}></input>
                    {/*MODAL START */}
                    <Modal isOpen={this.state.modalOpen} toggle={this.closeModal}>
                        <ModalHeader>
                            Add Movie
                        </ModalHeader>
                        <ModalBody>
                            <input type="text" ref="inputtitle" className="form-control mb-2" placeholder="Title"/>
                            <input type="text" ref="inputdirector" className="form-control mb-2" placeholder="Director"/>
                            <select required id = "myList" ref="inputgenre" className="form-control mb-2" placeholder="Genre">
                                    <option value="" disabled selected hidden>Choose Genre</option>
                                    {this.printGenreList()}
                            </select>
                            <input type="text" ref="inputurl"  className="form-control mb-2" placeholder="Image Url"/>
                            {/* <input type="number" ref="inputpt" min="1" max="24" className="form-control mb-2" placeholder="Playtime" /> */}
                            <div>
                            <FormGroup check inline>
                                <Label>
                                    Playing at : 
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" value="9" ref="radio1" innerRef="radio1Inner"/>09:00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" value="14" ref="radio2" innerRef="radio2Inner"/>14:00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" value="17" ref="radio3" innerRef="radio3Inner"/>17:00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" value="20" ref="radio4" innerRef="radio4Inner"/>20:00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" value="22" ref="radio5" innerRef="radio5Inner" />22:00
                                </Label>
                            </FormGroup>
                            </div>
                            {/* <select required id = "playtimelist" ref="inputpt" className="form-control mb-2" placeholder="playtime" multiple size="1">
                                    <option value="" disabled selected hidden>Choose Playtime (Hold Ctrl+Click for Multiple Opt)</option>
                                    <option value="8">8:00</option>
                                    <option value="9">9:00</option>
                                    <option value="10">10:00</option>
                                    <option value="11">11:00</option>
                                    <option value="12">12:00</option>
                                    <option value="13">13:00</option>
                                    <option value="14">14:00</option>
                                    <option value="15">15:00</option>
                                    <option value="16">16:00</option>
                                    <option value="17">17:00</option>
                                    <option value="18">18:00</option>
                                    <option value="19">19:00</option>
                                    <option value="20">20:00</option>
                                    <option value="21">21:00</option>
                                    <option value="22">22:00</option>
                                    <option value="23">23:00</option>
                                    <option value="24">24:00</option>
                            </select> */}
                            <input type="number" ref="inputduration"  className="form-control mb-2" placeholder="Duration"/>
                            <input type="text" ref="inputbannerimg"  className="form-control mb-2" placeholder="Link Banner Image"/>
                            <input type="text" ref="inputvideo"  className="form-control mb-2" placeholder="Video Embed Link"/>
                            <textarea  ref="inputsynopsis"  className="form-control mb-2" placeholder="Synopsis"/>
                            
                            <p id="warningbutton" style={{color : "red"}}> </p>
                        </ModalBody>
                        <ModalFooter>
                        <input type="button" value="SAVE" className="btn btn-success " onClick={this.validateForm}/>
                        <input type="button" value="CANCEL" className="btn btn-danger" onClick={this.closeModal}/>
                        </ModalFooter>
                    </Modal>
                    {/*MODAL END */}
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableCell>No</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Genre</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Banner Image</TableCell>
                                <TableCell>Director</TableCell>
                                <TableCell>Playtime</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Synopsis</TableCell>
                                <TableCell>Action</TableCell>
                            </TableHead>
                            <TableBody>
                                {/* <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow> */}
                                {this.printMovieData()}
                               
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
       currentUser : state.CURRENT_USER_DATA.currentUser,
       IS_ADMIN : state.CURRENT_USER_DATA.IS_ADMIN,
       IS_LOGGED_IN : state.CURRENT_USER_DATA.IS_LOGGED_IN
       
    }
}

export default connect(mapStateToProps)(manageMovie)