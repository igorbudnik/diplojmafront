import styles from "./about.module.css";
import photo from "../russ_fact.png";
import backgroung from "./backgroung.svg";

const About = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.textBlockLeft}>
          <h2 className={styles.title}>
            Географическое расположение заводов России
          </h2>
          <p className={styles.text}>
            Данное исследование посвящено анализу пространственного
            распределения промышленных предприятий на территории Российской
            Федерации. В работе рассматриваются закономерности размещения
            заводов, их связь с инфраструктурой, сырьевыми базами и трудовыми
            ресурсами.
          </p>
          <p className={styles.text}>
            Особое внимание уделяется выявлению региональных кластеров
            промышленного производства в современных экономических условиях.
          </p>
        </div>

        <div className={styles.imageBlockTop}>
          <img src={photo} width={850} height={530} />
        </div>
      </div>
    </main>
  );
};

export default About;
