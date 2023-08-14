export enum UpdateStateReason {
  OnUndoRedo = 'OnUndoRedo',
  Unknown = 'Unknown',
  Init = 'Init',
  Undo = 'Undo',
  Redo = 'Redo',
  NodesChangeByReactFlow = 'NodesChangeByReactFlow',
  EdgesChangeByReactFlow = 'EdgesChangeByReactFlow',

  BulkUpdateNodeInternal = 'BulkUpdateNodeInternal',

  AddEmptyKPINode = 'AddNewEmptyKPINode',
  AddKPINode = 'AddNewKPINode',
  DeleteKPINode = 'DeleteKPINode',
  UpdateKPINode = 'UpdateKPINode',
  UpdateKPINodeWhenPaste = 'UpdateKPINodeWhenPaste',

  UpdateNodeFocused = 'UpdateNodeFocused',
  UpdateNodePosition = 'UpdateNodePosition',
  BulkUpdateKpiNodes = 'BulkUpdateKpiNodes',

  AddEmptySpeechBallonNode = 'AddEmptySpeechBallonNode',
  AddSpeechBallonNode = 'AddSpeechBallonNode',
  DeleteSpeechBallonNode = 'DeleteSpeechBallonNode',
  DeleteUnSavedSpeechBallonNode = 'DeleteUnSavedSpeechBallonNode',
  UpdateUnSavedSpeechBallonNode = 'UpdateUnSavedSpeechBallonNode',
  UpdateSpeechBallonNodeData = 'UpdateSpeechBallonNodeData',
  UpdateSpeechBallonNodePosition = 'UpdateSpeechBallonNodePosition',
  UpdateSpeechBallonNodeResizing = 'UpdateSpeechBallonNodeResizing',
  UpdateSpeechBallonNodeSize = 'UpdateSpeechBallonNodeSize',

  AddCommentNode = 'AddCommentNode',
  UpdateCommentNode = 'UpdateCommentNode',
  DeleteCommentNode = 'DeleteCommentNode',
  AddCommentReply = 'AddCommentReply',
  UpdateCommentReply = 'UpdateCommentReply',
  DeleteCommentReply = 'DeleteCommentReply',

  RemoveKPINodeById = 'RemoveKPINodeById',
  RemoveEdge = 'RemoveEdge',

  RemoveEmptyNode = 'RemoveEmptyNode',

  UpdateEdge = 'UpdateEdge',

  RemoveEmptyKPINode = 'RemoveEmptyKPINode',
  RemoveEmptySpeechBallonNode = 'RemoveEmptySpeechBallonNode',

  ToggleDraggable = 'ToggleDraggable',
}
