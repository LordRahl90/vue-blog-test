<template>
    <div id="show-blogs">
      <input type="text" v-model="search" class="form-control" placeholder="Search Blogs" />
      <h1>All Blog Listings</h1>
      <ul>
        <li v-for="blog in filteredValue" class="single-blog">
          <h3>{{ blog.title | to-upper }}</h3>
          <p>{{ blog.content | to-upper | stripped }}</p>
        </li>
      </ul>
    </div>
</template>

<script>
  import SearchMixin from '../mixins/SearchMixin';
    export default {
      data(){
        return{
          blogs:[],
          search:''
        }
      },
      methods:{

      },
      created() {
        let url="https://vue-js-tutorial-ce72c.firebaseio.com/";

        this.$http.get(url+'blog-post.json').then(function(data){
          return data.json();
        }).then(function(data){
            let blogArrays=[];

            for(let key in data){
              data[key].id=key;
              blogArrays.push(data[key]);
            }

            this.blogs=blogArrays;
            console.log(this.blogs);
        });
      },
      filters:{
        toUpper(value){
          return value.toUpperCase();
        },
        stripped(value){
          return value.slice(0,3)+'...';
        }
      },
      mixins:[SearchMixin]
    }
</script>

<style scoped>
  #show-blogs{
    max-width: 800px;
    margin: 0 auto;
  }

  .single-blog{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
  }

  #show-blogs ul{
    list-style: none;
  }
</style>
