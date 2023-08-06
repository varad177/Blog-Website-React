
import Post from "../model/post.js";

export const createpost = async (request, response) => {
  try {
    const post = await new Post(request.body);
    post.save();

    return response.status(200).json({ message: "post saved successfully" });
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getallposts = async (request, response) => {
  let category = request.query.category;
  let posts;

  try {
    if (category) {
      posts = await Post.find({ category: category });


    } else {
      posts = await Post.find({});
    }
    return response.status(200).json(posts);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


export const getpost = async (request, response) => {
  try {

    const post = await Post.findById(request.params.id)

    return response.status(200).json(post);



  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

export const updatepost = async (request, response) => {
  try {

    const post = await Post.findById(request.params.id)
    if (!post) {
      return response.status(404).json({ message: "post not found" });
    }

    await Post.findByIdAndUpdate(request.params.id, { $set: request.body }) // ${set} , ${addtoset}
    return response.status(200).json({ message: 'posrt updated succesfully' });




  } catch (error) {
    return response.status(500).json({ message: error.message });

  }
}

export const deletepost = async (request , response) =>{
  try {

    await Post.findByIdAndDelete(request.params.id)
    // if (!post) {
    //   return response.status(404).json({ message: "post not found" });
    // }

    // await post.delete();
    return response.status(200).json({ message: 'post deleted succesfully' });


    
  } catch (error) {
    return response.status(500).json({ message: error.message });

  }
}