package movierankchart.batch.listener;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import movierankchart.batch.constants.BatchConstants;
import movierankchart.batch.constants.BatchErrorMessage;
import movierankchart.common.utils.DateUtils;
import movierankchart.domain.movieopenapihistory.entity.MovieOpenApiHistory;
import movierankchart.domain.movieopenapihistory.repository.MovieOpenApiHistoryRepository;
import movierankchart.domain.movierank.repository.MovieRankRepository;
import movierankchart.domain.movierank.service.MovieRankService;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.annotation.AfterJob;
import org.springframework.batch.core.annotation.BeforeJob;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class SaveMovieRankPastJobListener {
    private final MovieOpenApiHistoryRepository movieOpenApiHistoryRepository;
    private final MovieRankRepository movieRankRepository;
    private final MovieRankService movieRankService;
    private LocalDate startDate;

    @BeforeJob
    public void beforeJob(JobExecution jobExecution) {
        List<MovieOpenApiHistory> movieOpenApiHistories = movieOpenApiHistoryRepository.findAll();
        if (movieOpenApiHistories == null) {
            throw new IllegalArgumentException(BatchErrorMessage.MOVIE_OPEN_API_HISTORY_EMPTY);
        }
        MovieOpenApiHistory movieOpenApiHistory = movieOpenApiHistories.get(0);
        startDate = movieOpenApiHistory.getStartDate();
        String dateString = DateUtils.localDateToString(startDate, BatchConstants.YYYYMMDD);
        jobExecution.getExecutionContext()
                .put(BatchConstants.START_DATE, dateString);
    }

    @AfterJob
    public void afterJob(JobExecution jobExecution) {
        if (jobExecution.getStatus() != BatchStatus.COMPLETED) {
            return;
        }
        List<LocalDate> datesInRange = DateUtils.getLocalDatesInRange(startDate.minusDays(7), startDate.minusDays(7).plusDays(BatchConstants.DAILY_API_CALLS - 1));
        boolean hasInvalidMovieRankData = movieRankService.hasInvalidMovieRankData(datesInRange);
        if (hasInvalidMovieRankData) {
            log.error(BatchErrorMessage.INVALID_MOVIE_RANK_DATA);
            jobExecution.setStatus(BatchStatus.FAILED);
            return;
        }
        LocalDate minDate = movieRankRepository.findMinDate();
        List<MovieOpenApiHistory> movieOpenApiHistories = movieOpenApiHistoryRepository.findAll();
        if (movieOpenApiHistories == null) {
            throw new IllegalArgumentException(BatchErrorMessage.MOVIE_OPEN_API_HISTORY_EMPTY);
        }
        MovieOpenApiHistory movieOpenApiHistory = movieOpenApiHistories.get(0);
        movieOpenApiHistory.setStartDate(minDate);
        movieOpenApiHistoryRepository.save(movieOpenApiHistory);
    }

}

