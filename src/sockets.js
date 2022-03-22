import Note from "./models/Note";

export default (io) => {

    io.on('connection', (socket) => {
        // console.log(socket);

        const emitNotes = async() => {
            const notes = await Note.find();
        //    console.log(notes);
            io.emit('server:loadnotes', notes);
        }
        emitNotes();

        socket.on('client:newnote', async(data) => {
            const newNote = new Note(data);
            const saveNote = await newNote.save();
            io.emit('server:newnote', saveNote)
        });

        socket.on('client:deletenote', async (id) => {
            // console.log(id);
            await Note.findByIdAndDelete(id);
            emitNotes();
        });

        socket.on('client:getnote', async(id) => {
            // console.log(id);
            const note = await Note.findById(id);
            // console.log(note);
            io.emit('server:selectednote', note);
        });

        socket.on('client:updatenote',async (updatedNote) => {
            // console.log(data);
            await Note.findByIdAndUpdate(updatedNote._id, {
                title: updatedNote.title,
                description: updatedNote.description
            });
            emitNotes();
        });

    });

}