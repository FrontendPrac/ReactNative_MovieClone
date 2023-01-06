import React, { useState } from "react";
import { View, Text, Modal } from "react-native";
import { Rating } from "react-native-ratings";
import styled from "@emotion/native";
import { addDoc, collection } from "firebase/firestore";
import { authService, dbService } from "../../firebase";

const ReviewModal = ({ movieId, isOpenModal, setIsOpenModal }) => {
  // client state
  const [ratings, setRatings] = useState(0);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  // 별점 함수
  const getRatings = (ratings) => {
    setRatings(ratings);
  };

  // 데이터 추가 함수
  const addReview = async () => {
    await addDoc(collection(dbService, "reviews"), {
      userId: authService.currentUser?.uid,
      movieId: movieId,
      title: modalTitle,
      content: modalContent,
      rating: ratings,
      createdAt: Date.now(),
    });
    setIsOpenModal(false);
    setModalTitle("");
    setModalContent("");
    setRatings(0);
  };

  return (
    <Modal visible={isOpenModal} transparent animationType="slide">
      <Backdrop>
        <Dialog>
          <InputWrapper>
            <ModalTitle>평가</ModalTitle>
            <Rating
              startingValue={0}
              style={{
                alignItems: "flex-start",
              }}
              onFinishRating={getRatings}
              ratingCount={10}
              imageSize={25}
              tintColor="black"
            />
            <ModalTitle>제목</ModalTitle>
            <TitleInput
              value={modalTitle}
              onChangeText={(text) => setModalTitle(text)}
            />
            <ModalTitle>내용</ModalTitle>
            <ContentInput
              textAlignVertical="top"
              value={modalContent}
              onChangeText={(text) => setModalContent(text)}
              multiline
              maxLength={300}
            />
          </InputWrapper>
          <Row>
            <ModalBtn onPress={() => setIsOpenModal(false)} title={"Cancel"} />
            <ModalBtn
              disabled={!ratings || !modalTitle || !modalContent}
              onPress={addReview}
              title="Add Review"
            />
          </Row>
        </Dialog>
      </Backdrop>
    </Modal>
  );
};

export default ReviewModal;

const Backdrop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Dialog = styled.KeyboardAvoidingView`
  background-color: black;
  width: 80%;
  height: 90%;
  padding: 20px;
  border-radius: 10px;
`;

const InputWrapper = styled.View``;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const TitleInput = styled.TextInput`
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const ContentInput = styled(TitleInput)`
  min-height: 100px;
`;

const Row = styled.TouchableOpacity`
  padding: 10px;
`;

const ModalBtn = styled.Button``;
