import * as express from 'express';
import TaskList from '../models/tasklist';
let router = express.Router();

router.get('/', (req, res) => {
    TaskList.find().then((list) => {
        res.json(list);
    }).catch((err) => {
        res.status(500);
        console.error(err);
    })
});

// Get a single list by id
router.get('/:id', (req, res) => {
    TaskList.findById(req.params['id']).then((list) => {
        res.json(list);
    });
});

//Get list by ID and send the list in an array
router.get('/:id/:tasks', (req, res) => {
    TaskList.findById(req.params['id']).then((list) => {
        console.log(list);
        let finallist = list.tasks;
        console.log(finallist);
        res.json(finallist);
    });
});

// Create new name
router.post('/', (req, res) => {
    let list = new TaskList();
    list.name = req.body.name;
    list.tasks = req.body.tasks;


    // save new list
    list.save().then((newTaskList) => {
        res.json(newTaskList);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

// Update existing list
router.post('/:id', (req, res) => {
    let listId = req.params['id'];

    TaskList.findByIdAndUpdate(listId, { "name": req.body.name }, function (err, list) {
        if (err != null) {
            console.log(err);
            res.json(err);
        }

        console.log('updated database with the value:   ' + list);
        res.json(list);
    });
});

// Delete list
router.delete('/:id', (req, res) => {
    let listId = req.params.id;
    TaskList.remove({ _id: listId }).then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        res.status(500);
        console.log(err);
    });
});

export default router;
