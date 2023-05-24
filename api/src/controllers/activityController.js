const { Activity, Country } = require('../db');

const createActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    // Verificar que se recibieron todos los datos necesarios
    if (!name || !difficulty || !duration || !season || !countries) {
      return res.status(400).json({ message: 'Mandatory data missing' });
    }

    // Crear la actividad turística en la base de datos
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    // Relacionar la actividad turística con los países indicados
    await newActivity.addCountries(countries);

    // Obtener los países relacionados con la actividad
    const relatedCountries = await Country.findAll({
      where: { id: countries },
    });

    // Retornar una respuesta exitosa con la información de la actividad y los países relacionados
    res.status(201).json({
      id: newActivity.id,
      name: newActivity.name,
      difficulty: newActivity.difficulty,
      duration: newActivity.duration,
      season: newActivity.season,
      countries: relatedCountries,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating activity', error: error });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: {
        model: Country,
        attributes: ['id', 'name', 'flagImage', 'continent'],
      }
    });

    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error when obtaining tourist activities' });
  }
};
const deleteActivity = async (req, res) => {
  const activityNameData = req.params.id;
  try {
    await Activity.destroy({
      where: {
        id: activityNameData,
      },
    });
    return res.status(204).json({ message: 'Activity deleted' });
  } catch (error) {
    return res.status(500).send(error);
  }
}
const modifyActivity = async (req, res) => {
  const { id } = req.params
  const activityToModify = await Activity.findOne({
    where: {id }
    })
    if (!activityToModify) {
      return res.status(404).json({ message: 'Activity not found' });
      }
      const { name, difficulty, duration, season, countries } = req.body
      try {
        const updatedActivity = await activityToModify.update({
          name,
          difficulty,
          duration,
          season,
          countries,
          });
          return res.status(201).json(updatedActivity);
          } catch (error) {
            return res.status(500).json({ message: 'Error when updating tourist activity' });
            }
}

module.exports = { createActivity, getActivities, deleteActivity, modifyActivity };
