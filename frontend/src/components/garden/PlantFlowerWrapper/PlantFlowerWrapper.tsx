import FlowerSelection from "../FlowerSelection/FlowerSelection";
import PlantFlowerForm from "../PlantFlowerForm/PlantFlowerForm";
import css from "./PlantFlowerWrapper.module.css";

export default function PlantFlowerWrapper() {
  return (
    <>
      <div className={css.container}>
        <FlowerSelection />
        <PlantFlowerForm />
      </div>
    </>
  );
}
