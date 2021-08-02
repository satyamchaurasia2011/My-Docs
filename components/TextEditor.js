import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import { convertToRaw, convertFromRaw ,EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { db } from '../firebase';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
  

const Editor = dynamic(() => import("react-draft-wysiwyg").then(module=>module.Editor),{
    ssr : false,
}
);
function TextEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [session] = useSession();
    const router = useRouter();
    const { id } = router.query;

    const [snapshot] = useDocumentOnce(
        db.collection('userDocs').doc(session.user.email).collection('document').doc(id)
    ) 
    useEffect(() => {
        if(snapshot?.data()?.editorState){
            setEditorState(
                EditorState.createWithContent(convertFromRaw(snapshot?.data()?.editorState))
            );
        }
      
    }, [snapshot])

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);

        db.collection('userDocs').doc(session.user.email).collection('document').doc(id).set({
            editorState : convertToRaw(editorState.getCurrentContent())
        }, {
            merge : true
        })
    };
    console.log(editorState);
    return (
        <div className='bg-[#F8F9FA] min-h-screen pb-16'>
            <Editor
            editorState = {editorState}
             toolbarClassName='flex sticky top-0 z-50 !justify-center mx-auto'
             editorClassName='mt-6 bg-white shadow-lg max-w-6xl mx-auto mb-12 p-10 border'
             onEditorStateChange = {onEditorStateChange}
            />
        </div>
    );
}

export default TextEditor
