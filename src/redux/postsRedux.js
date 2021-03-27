import Axios from 'axios';
import { API_URL } from '../configuration.js';
/* selectors */
export const getAll = ({posts}) => posts.data;



/*export const getAllPublished = ({posts}) => { 
  //convertujemy object do array, bo filter działa tylko dla array
  const arr = Object.values(posts.data);
  arr.filter(item => item.status === 'published');
 
}*/
export const getAllPublished = ({posts}) => posts.data.filter(item => item.status == 'published');
export const getPostById = ({posts}, postId) => posts.data;
export const getActivePost = ({posts}) => posts.activePost;








/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const UPDATE_POST = createActionName('UPDATE_POST');
const SELECT_POST = createActionName('SELECT_POST');
/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addNewPost =  payload => ({payload, type: ADD_POST});
export const updatePost = payload => ({payload: payload, type: UPDATE_POST });
export const selectPost = payload => ({payload: payload, type: SELECT_POST });

/* thunk creators */
//selected all posts
export const fetchPublished = () => {
  return (dispatch, getState) => {
      dispatch(fetchStarted());
      const state = getState();
      if(!state.posts.data.length) {
    Axios
      .get(`${API_URL}/posts`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
    }
  };
};

/* wyszukiwanie post id w bazie*/
export const fetchSelected = (id) => {
  return async dispatch => {
    dispatch(fetchStarted());

     Axios
      .get(`${API_URL}/posts/${id}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
    }
  };
/*Add Post*/ 
  export const addPostRequest = (post) => {
    console.log('reduxpost',post);
    return async dispatch => {
  
      dispatch(fetchStarted());
      try {
        let res = await Axios.post(`${API_URL}/posts`, post);
        dispatch(addNewPost(res.data));
      } catch(err) {
        dispatch(fetchError(err.message || true));
      }
  
    };
  };
  export const editPostRequest = (post) => {
    return async dispatch => {
      dispatch(fetchStarted());
      try {
        let res = await Axios.put(`${API_URL}/posts/${post.id}`, post);
  
        await new Promise((resolve) => resolve());
        dispatch(updatePost(res.data));
      } catch(err) {
        dispatch(fetchError(err.message || true));
      }
  
    };
  };


/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [...statePart.data, action.payload],
      };
    }
    case SELECT_POST: {
      console.log('statePart select',statePart);
      console.log('action.payload select',action.payload);
      return {
      
        ...statePart,
        activePost: action.payload,
      };
    }
    case UPDATE_POST: {
      console.log(statePart);
      console.log(action.payload);
      return {
        ...statePart,
        activePost: action.payload,
        data: statePart.data.map(data => {
          console.log(`2`, data);

          if (data.id === action.payload.id) {
            return {
              ...action.payload,
            };
          } else {
            console.log(`3`, data);
            return data;
          }
        }),
      };
    }
    
    default:
      return statePart;
  }
};
