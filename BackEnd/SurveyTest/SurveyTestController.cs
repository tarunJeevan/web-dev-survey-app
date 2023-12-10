using Microsoft.AspNetCore.Mvc;
using Moq;
using SurveyAPI.Controllers;
using SurveyAPI.Interfaces;
using SurveyAPI.SurveyModels;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
namespace SurveyTest
{
    public class SurveyControllerTests
    {
        [Fact]
        public async Task CreateSurvey_ReturnsOkResult()
        {
            // Arrange
            var mockSurvey = new Mock<ISurvey>();
            mockSurvey.Setup(repo => repo.CreateSurvey(It.IsAny<Survey>()))
                      .ReturnsAsync(true);

            var controller = new SurveyController(mockSurvey.Object);

            // Act
            var result = await controller.CreateSurvey(new Survey());

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Survey added successfully", okResult.Value);
        }

        [Fact]
        public async Task CreateSurvey_ReturnsBadRequestResult()
        {
            // Arrange
            var mockSurvey = new Mock<ISurvey>();
            mockSurvey.Setup(repo => repo.CreateSurvey(It.IsAny<Survey>()))
                      .ReturnsAsync(false);

            var controller = new SurveyController(mockSurvey.Object);

            // Act
            var result = await controller.CreateSurvey(new Survey());

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("An error occurred while creating Survey", badRequestResult.Value);
        }

        [Fact]
        public async Task SubmitResponseSurvey_ReturnsOkResult()
        {
            // Arrange
            var mockSurvey = new Mock<ISurvey>();
            mockSurvey.Setup(repo => repo.SubmitSurvey(It.IsAny<SurveyResponse>()))
                      .ReturnsAsync(true);

            var controller = new SurveyController(mockSurvey.Object);

            // Act
            var result = await controller.SubmitResponseSurvey(new SurveyResponse());

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Survey response submitted successfully", okResult.Value);
        }

        [Fact]
        public async Task SubmitResponseSurvey_ReturnsBadRequestResult()
        {
            // Arrange
            var mockSurvey = new Mock<ISurvey>();
            mockSurvey.Setup(repo => repo.SubmitSurvey(It.IsAny<SurveyResponse>()))
                      .ReturnsAsync(false);

            var controller = new SurveyController(mockSurvey.Object);

            // Act
            var result = await controller.SubmitResponseSurvey(new SurveyResponse());

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("An error occurred while submitting Survey", badRequestResult.Value);
        }

        [Fact]
        public async Task GetSurvey_ReturnsSurveyList()
        {
            // Arrange
            var mockSurvey = new Mock<ISurvey>();
            mockSurvey.Setup(repo => repo.GetResearcherSurveys())
                      .ReturnsAsync(new List<Survey> { new Survey() });

            var controller = new SurveyController(mockSurvey.Object);

            // Act
            var result = await controller.GetSurvey();

            // Assert
            var surveyList = Assert.IsType<List<Survey>>(result);
            Assert.Single(surveyList);
        }

        [Fact]
        public void GetSurvey_ReturnsSurveyObject()
        {
            // Arrange
            var mockSurvey = new Mock<ISurvey>();
            mockSurvey.Setup(repo => repo.GetSurveyObject(It.IsAny<string>(), It.IsAny<int>()))
                      .Returns(new Survey());

            var controller = new SurveyController(mockSurvey.Object);

            // Act
            var result = controller.GetSurvey("researcherName", 1);

            // Assert
            var surveyObject = Assert.IsType<Survey>(result);
            Assert.NotNull(surveyObject);
        }
    }

}