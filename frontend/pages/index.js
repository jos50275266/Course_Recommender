import Link from "next/link";
import axios from "axios";
import { API } from "../config";

import {
  Wrapper,
  Container,
  ContainerHeader,
  CategoryContainer,
  CategoryCard,
  CategorySection,
  CategoryImage,
  CategoryName,
} from "../components/Category/CategoryElements";

const Home = ({ categories }) => {
  const listCategories = () =>
    categories.map((category, index) => (
      <Link key={category._id} href={`/links/${category.slug}`}>
        <CategoryCard>
          <CategorySection>
            <CategoryImage
              src={category.image && category.image.url}
              alt={category.name}
            />
            <CategoryName>{category.name}</CategoryName>
          </CategorySection>
        </CategoryCard>
      </Link>
    ));

  return (
    <Wrapper>
      <Container>
        <ContainerHeader>Programming Tutorials / Courses</ContainerHeader>
      </Container>
      <CategoryContainer>{listCategories()}</CategoryContainer>
    </Wrapper>
  );
};

Home.getInitialProps = async () => {
  const response = await axios.get(`${API}/categories`);

  return {
    categories: response.data,
  };
};

export default Home;
