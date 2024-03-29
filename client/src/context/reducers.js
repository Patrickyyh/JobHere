import React from 'react'
import { CLEAR_ALERT, DISPLAY_ALERT, 
        REGISTER_USER_BEGIN, 
        REGISTER_USER_ERROR, 
        REGISTER_USER_SUCCESS ,
        LOGIN_USER_BEGIN  ,
        LOGIN_USER_SUCCESS ,
        LOGIN_USER_ERROR   ,  
        LOGOUT_USER,
        LOGIN_GOOGLE_USER_BEGIN  ,
        LOGIN_GOOGLE_USER_SUCCESS,
        LOGIN_GOOGLE_USER_ERROR  ,
        TOGGLE_SIDEBAR,
        UPDATE_USER_BEGIN,
        UPDATE_USER_SUCCESS,
        UPDATE_USER_ERROR,
        HANDLE_CHANGE,
        CLEAR_VALUES,
        CREATE_JOB_BEGIN  ,
        CREATE_JOB_SUCCESS,
        CREATE_JOB_ERROR  ,
        GET_JOBS_BEGIN,
        GET_JOBS_SUCCESS, 
        SET_EDIT_JOB,
        DELETE_JOB_BEGIN,
        EDIT_JOB_BEGIN,
        EDIT_JOB_SUCCESS,
        EDIT_JOB_ERROR, 
        SHOW_STATS_BEGIN   ,
        SHOW_STATS_SUCCESS , 
        CLEAR_FILTERS, 
        CHANGE_PAGE , 
        LEAVE_STREAM, 
    } from './actions';

import { initialState } from './appContext';


const reducers = (state, action) => {

    // Join the stream 
    if(action.type === LEAVE_STREAM){
        return {...state , isStreaming: !state.isStreaming}
    }

    // Toggle the sidebar 
    if(action.type === TOGGLE_SIDEBAR){
        return {...state , showSideBar: !state.showSideBar}
    }

    if(action.type === CHANGE_PAGE ){
        return {...state, page: action.payload.page}
    }
    

    // Clear the values 
    if(action.type === CLEAR_VALUES){
        const updateState = {
            isEditing: false,
            editJobId: '',
            position: '',
            company: '',
            jobLocation: state.userLocation,
            jobType: 'full-time',
            status: 'pending',
        }
        return {...state, ...updateState}
    }


    if(action.type === DELETE_JOB_BEGIN){
        
        return {...state, isLoading: true}
        
    }    


    if(action.type === CLEAR_FILTERS){
        return {...state,
            search: '',
            searchStatus: 'all',
            searchType: 'all',
            sort : 'latest',
        }
    }


    if(action.type === SHOW_STATS_BEGIN){
        return {...state, isLoading: true , showAlert: false}

    }

    if(action.type === SHOW_STATS_SUCCESS){
        return {...state ,
                isLoading: false,
                stats: action.payload.stats,
                monthlyApplications: action.payload.monthlyApplications,
        }
    }



    if(action.type === EDIT_JOB_BEGIN){
        return {...state , isLoading: true}; 
    }

    

    if(action.type === EDIT_JOB_SUCCESS){
        return {...state , 
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Job Updated!',
        }
    }

    if(action.type === EDIT_JOB_ERROR){
        return {...state , 
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,}
        
    }



    if(action.type === CREATE_JOB_BEGIN){
        return {...state, isLoading: true}
    }

    if(action.type === CREATE_JOB_SUCCESS){
        return {...state, 
            isLoading: false,
            showAlert: true,
            alertType:'success',
            alertText: 'New job Created!',
        }
    }

    if(action.type === CREATE_JOB_ERROR){
        return {...state, 
            isLoading: false,
            showAlert: true,
            alertType:'danger',
            alertText: action.payload.msg,
        }
    }

    if(action.type === GET_JOBS_BEGIN){
          return {...state , isLoading: true , showAlert: false}

    }

    if(action.type === GET_JOBS_SUCCESS){
        return {...state, 
                isLoading: false, 
                jobs:      action.payload.jobs, 
                totalJobs: action.payload.totalJobs,
                numbOfPages: action.payload.numbOfPages
            }
    }

    if(action.type === SET_EDIT_JOB){
         let job = undefined;

         // finding the job id with specific.
         // we could make this part shorten 
         for(let i = 0 ; i < state.jobs.length ; i++){
             if(state.jobs[i]._id === action.payload.id){
                 job = state.jobs[i];
             }
         }
         
         const {_id, position, company, jobLocation, jobType, status } = job;
         
         return {...state,
                    isEditing: true,
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    jobType,
                    status,
                }

        }   


    // Handle Change
    if(action.type === HANDLE_CHANGE){
        return {...state, [action.payload.name] : action.payload.value }
    }

    // UPDATE USER BEGIN
    if(action.type === UPDATE_USER_BEGIN){
        return {...state , isLoading: true}
    }
    //UPDATE USER SUCCESS
    if(action.type === UPDATE_USER_SUCCESS){
        return {...state ,    
            user: action.payload.user,
            token: action.payload.token,
            userLocation : action.payload.location,
            jobLocation: action.payload.location,
            isLoading: false,
            showAlert: true, 
            alertText: 'User Profile updated',
            alertType: 'success',
        
            }
    }
    


    //UPDATE USER ERROR 
    if(action.type === UPDATE_USER_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType : 'danger',
            alertText : action.payload.msg,
        }

    }



    // Log the user out
     if(action.type === LOGOUT_USER){
         return {
             ... initialState  , 
            user: null,
            token: null,
            userLocation: '',
            jobLocation: ''
        }
     }

    // Register user begin reducers 

    if(action.type === LOGIN_USER_BEGIN ){
        return {...state , isLoading: true}
    }


    if(action.type === LOGIN_USER_SUCCESS ){
        return {...state ,
            
            user: action.payload.user,
            token: action.payload.token,
            userLocation : action.payload.location,
            jobLocation: action.payload.location,
            isLoading: false,
            showAlert: true, 
            alertText: 'Login Successful! Redirecting....',
            alertType: 'success',
        
            }
    }


    if(action.type === LOGIN_USER_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType : 'danger',
            alertText : action.payload.msg,
        }

    }


    if(action.type === REGISTER_USER_BEGIN){
        return {...state, isLoading: true};
    }


    if(action.type === REGISTER_USER_SUCCESS){
        return {...state , 
                user: action.payload.user,
                token : action.payload.token,
                userLocation: action.payload.location,
                jobLocation:  action.payload.location,
                isLoading: false,
                showAlert: true, 
                alertText: 'User Created! Redirecting....',
                alertType: 'success',
                 
        }
    }


    if(action.type === REGISTER_USER_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType : 'danger',
            alertText : action.payload.msg,

        }
    }

     // handle the missing field errors 
    if(action.type === DISPLAY_ALERT){
        return {
                ...state ,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values',    
            }
    
        }
    if(action.type === CLEAR_ALERT){
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '', 
        }
    }

    throw new Error(`no such action : ${action.type}`);
}



export default reducers
