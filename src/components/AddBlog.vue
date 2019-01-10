<template>
    <div id="add-blog">
      <div class="container-fluid">
        <div class="col-md-12">
          <div v-show="submitted" v-bind:class="classResponse">{{ response }}</div>
          <div class="col-md-6" v-show="!submitted">
            <h1>Add a new blog</h1>
            <form class="form-inline">
              <label>Blog Title</label>
              <input type="text" class="form-control" v-model="blog.title" placeholder="Blog Title" />

              <label>Blog Content</label>
              <textarea v-model="blog.content"></textarea>

              <label>Select Author</label>
              <select v-model="blog.author" class="form-control">
                <option selected="selected" disabled="disabled">Select Author</option>
                <option v-for="author in authors">{{ author }}</option>
              </select>
              <br />

              <div class="col-md-12">
                <div class="col-md-6">
                  <div id="checkboxes">
                    <ul>
                      <li v-for="category in categoryOptions">
                        <label>{{ category }}</label>
                        <input type="checkbox" v-model="blog.categories" v-bind:value="category" />
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-md-6">
                  <div id="radiobuttons" class="col-md-6">
                    <ul>
                      <li v-for="gender in genders">
                        <label>{{ gender }}</label>
                        <input type="radio" v-model="blog.gender" name="gender" v-bind:value="gender" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button v-on:click.prevent="createPost()" class="btn btn-primary">Create New Post</button>
            </form>
          </div>

          <div class="col-md-6" id="preview">
            <p>Title: <b>{{ blog.title }}</b></p>
            <label>Content:</label>
            <p align="justify">{{ blog.content }}</p>
            <p>Author: {{ blog.author }}</p>
            <div>
              <label>Categories: </label>
              <ul>
                <li v-for="category in blog.categories">{{ category }}</li>
              </ul>
            </div>

            <div>
              <label>Gender:</label> {{ blog.gender }}
            </div>

            <div v-show="submitted">
              <button class="btn btn-info" v-on:click="createNewPost()">Create Another Post</button>
            </div>

          </div>


        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          classResponse:'',
          response:'',
          genders:[
            'Male',
            'Female'
          ],
          categoryOptions:[
            'Scary',
            'Movie',
            'Testing',
            'Just There'
          ],
          authors:[
            'Wole Soyinka',
            'JF Odunjo',
            'Emeka Ike',
            'Ola Owolabi'
          ],
          blog:{
            title:'',
            content:'',
            author:'',
            categories:[],
            gender:''
          },
          submitted:false
        }
      },
      methods:{
        createPost(){
          let url="https://vue-js-tutorial-ce72c.firebaseio.com/";

          this.$http.post(url+"blog-post.json",this.blog).then(function(data){
            if(data.status!=200){
              this.response='An error occurred while posting this record';
              this.classResponse='alert alert-danger';
              return;
            }


            this.submitted=true;
            this.response="Blog Posted Successfully.";
            this.classResponse='alert alert-success';
          });
        },
        createNewPost(){
          this.blog.title="";
          this.blog.content="";
          this.blog.author="";
          this.blog.categories=[];
          this.blog.gender='';

          this.submitted=false;
        }
      },
      created(){
        // alert('Created');
      }
    }
</script>

<style scoped>
  #add-blog *{
    box-sizing: border-box;
  }
  #add-blog{
    /*margin: 20px auto;*/
    /*max-width: 500px;*/
  }
  label{
    display: block;
    margin: 20px 0 10px;
  }
  input[type="text"], textarea{
    display: block;
    width: 100%;
    padding: 8px;
  }
  #preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
  }
  h3{
    margin-top: 10px;
  }

  #checkboxes{
    display: inline-block;
    margin-right: 10px;
  }

  #checkboxes ul{
    list-style: none;
  }

  #radiobuttons ul{
    list-style: none;
  }

  #checkboxes ul li label{
    display: inline-block;
  }

  #preview{
    border: 1px solid #000;
  }
</style>
