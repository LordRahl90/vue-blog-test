export default {
  computed:{
    filteredValue(){
      return this.blogs.filter((blog)=>{
        return blog.title.match(this.search);
      });
    }
  }
}
