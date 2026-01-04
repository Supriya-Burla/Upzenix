import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const KanbanPage = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('kanbanColumns');
    return saved ? JSON.parse(saved) : {
      todo: {
        name: 'To Do',
        items: [
          { id: '1', content: 'Plan movie release' },
          { id: '2', content: 'Update ticket prices' },
        ],
      },
      inProgress: {
        name: 'In Progress',
        items: [
          { id: '3', content: 'Design new posters' },
        ],
      },
      done: {
        name: 'Done',
        items: [
          { id: '4', content: 'Book theater' },
        ],
      },
    };
  });

  const [editingTask, setEditingTask] = useState(null);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [addingToColumn, setAddingToColumn] = useState(null);

  const handleEditTask = (taskId, newContent) => {
    const updatedColumns = { ...columns };
    Object.keys(updatedColumns).forEach(columnId => {
      updatedColumns[columnId].items = updatedColumns[columnId].items.map(item =>
        item.id === taskId ? { ...item, content: newContent } : item
      );
    });
    setColumns(updatedColumns);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    const updatedColumns = { ...columns };
    Object.keys(updatedColumns).forEach(columnId => {
      updatedColumns[columnId].items = updatedColumns[columnId].items.filter(item => item.id !== taskId);
    });
    setColumns(updatedColumns);
  };

  const handleAddTask = (columnId) => {
    if (newTaskContent.trim()) {
      const newTask = {
        id: Date.now().toString(),
        content: newTaskContent.trim(),
      };
      setColumns({
        ...columns,
        [columnId]: {
          ...columns[columnId],
          items: [...columns[columnId].items, newTask],
        },
      });
      setNewTaskContent('');
      setAddingToColumn(null);
    }
  };

  useEffect(() => {
    localStorage.setItem('kanbanColumns', JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="flex-shrink-0 w-80">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">{column.name}</h2>
                <button
                  onClick={() => setAddingToColumn(columnId)}
                  className="p-1 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-gray-800 p-4 rounded-lg min-h-[400px] transition-colors ${
                      snapshot.isDraggingOver ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`bg-gray-700 p-4 mb-2 rounded-lg shadow-sm border border-gray-700 group hover:shadow-md transition-shadow ${
                              snapshot.isDragging ? 'shadow-lg -translate-y-1' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div {...provided.dragHandleProps} className="flex-1 cursor-grab active:cursor-grabbing">
                                {editingTask === item.id ? (
                                  <input
                                    type="text"
                                    defaultValue={item.content}
                                    onBlur={(e) => handleEditTask(item.id, e.target.value)}
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        handleEditTask(item.id, e.target.value);
                                      }
                                    }}
                                    className="w-full bg-transparent border-none outline-none text-white"
                                    autoFocus
                                  />
                                ) : (
                                  <p className="text-white">{item.content}</p>
                                )}
                              </div>
                              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => setEditingTask(item.id)}
                                  className="p-1 text-gray-300 hover:text-blue-400"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTask(item.id)}
                                  className="p-1 text-gray-300 hover:text-red-400"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {addingToColumn === columnId && (
                      <div className="bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-600 border-dashed">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Enter task..."
                            value={newTaskContent}
                            onChange={(e) => setNewTaskContent(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddTask(columnId);
                              }
                            }}
                            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            autoFocus
                          />
                          <button
                            onClick={() => handleAddTask(columnId)}
                            className="p-1 text-green-500 hover:text-green-600"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setAddingToColumn(null);
                              setNewTaskContent('');
                            }}
                            className="p-1 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanPage;