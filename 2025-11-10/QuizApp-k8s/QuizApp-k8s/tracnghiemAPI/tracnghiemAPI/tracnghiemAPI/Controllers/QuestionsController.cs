using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tracnghiemAPI.Models;

namespace tracnghiemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly TracNghiemDbContext _context;

        public QuestionsController(TracNghiemDbContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            var random5Qns = await (_context.Questions.Select(x => new
            {
                QnId = x.QnId,
                QnInWords = x.QnInWords,
                ImageName = x.ImageName,
                Options = new string[] { x.Option1, x.Option2, x.Option3, x.Option4 },
                Answer = x.Answer
            })
                  .OrderBy(y => Guid.NewGuid())
                  ).ToListAsync();
            return Ok(random5Qns);
        }

        // GET: api/Questions/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Question>>> GetAllQuestions()
        {
            var getall = await (_context.Questions.Select(x => new
            {
                QnId = x.QnId,
                QnInWords = x.QnInWords,
                ImageName = x.ImageName,
                Options = new string[] { x.Option1, x.Option2, x.Option3, x.Option4 },
                Answer = x.Answer
            })
                  .OrderBy(y => Guid.NewGuid())
                  ).ToListAsync();
            return Ok(getall);
        }


        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
          if (_context.Questions == null)
          {
              return NotFound();
          }
            var question = await _context.Questions.FindAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        // PUT: api/Questions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            if (id != question.QnId)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        [Route("GetAnswers")]
        public async Task<ActionResult<Question>> PostQuestion(int[] qnIds)
        {
            var answers = await (_context.Questions
                .Where(x => qnIds.Contains(x.QnId))
                .Select(y => new
                {
                    QnId = y.QnId,
                    QnInWords = y.QnInWords,
                    ImageName = y.ImageName,
                    Options = new string[] { y.Option1, y.Option2, y.Option3, y.Option4 },
                    Answer = y.Answer.ToString() // Chuyển đổi Answer thành chuỗi
                })).ToListAsync();
            return Ok(answers);
        }

        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetQuestion", new { id = question.QnId }, question);
        }


        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionExists(int id)
        {
            return (_context.Questions?.Any(e => e.QnId == id)).GetValueOrDefault();
        }


        [HttpPost("PostQuestions")]
        public async Task<IActionResult> PostQuestions(IEnumerable<Question> questions)
        {
            if (questions == null || !questions.Any())
                return BadRequest("No questions provided.");

            try
            {
                foreach (var question in questions)
                {
                    _context.Questions.Add(question);
                }

                await _context.SaveChangesAsync();
                return Ok("Questions saved successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


    }
}
