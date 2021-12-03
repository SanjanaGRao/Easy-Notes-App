/* 
 * @description     : get the request, response object from label routes
 * @file            : label.controller.js
 * @author          : Sanjana Rao
 * @version         : 1.0
 * @since           : 01-12-2021
*/

const labelService = require("../../service/label.service");
const logger = require("../../../config/winston_logger");
  
class LabelController { 
  /**
   * @description handles request response for creating a label
   * @param {Object} req
   * @param {Object} res
   */
  create = async (req, res) => {
    let title = req.body.title;
    let userId = req.body.userId;
    try {
      const data = await labelService.createNewLabel(title, userId);
      return res.send(data);
    } catch (error) {
        logger.error(error);
        res.send(error);
    }
  };
  
  /**
   * @description handles request response for retrieving all labels from the database.
   * @param {Object} req
   * @param {Object} res
   */
  findAll = async (req, res) => {
    let userId = req.body.userId;
    try {
      const data = await labelService.findAllLabels(userId);
      logger.info("responded with all labels");
      return res.send(data);
    } catch (error) {
        logger.error(error);
        return res.send(error);
    }
  };
  
  /**
   * @description handles request response for finding a single label with a labelId
   * @param {Object} req
   * @param {Object} res
   */
  findOne = async (req, res ) => {
    let id = req.params.labelId;
    let userId = req.body.userId; 
    try {
      const data = await labelService.findLabel(userId, id);
      return res.send(data);
      }
     catch(error) {
        logger.error(error);
        return res.send(error);
    }
  };
  
  /**
   * @description handles request response for updating a label identified by the labelId in the request
   * @param {Object} req
   * @param {Object} res
   */
  update = async (req, res) => {
    let id = req.params.labelId;
    let title = req.body.title; 
    let userId = req.body.userId;
    try {
      const data = await labelService.updateLabel(userId, id, title);
      return res.send(data);
    } catch (error) {
        logger.error(error);
        return res.send(error);
    }
  };
  
  /**
   * @description handles request response for deleting a label with the specified labelId in the request
   * @param {Object} req
   * @param {Object} res
   */
  deleteOne = async (req, res) => {
    let id = req.params.labelId;
    let userId = req.body.userId;
    try {
        const data = await labelService.deleteById(id, userId)
        return res.send({message: "Label deleted successfully!"});
    } catch (error) {
        logger.error(error);
        return res.send(error);
    }
  };
}
  
module.exports = new LabelController();